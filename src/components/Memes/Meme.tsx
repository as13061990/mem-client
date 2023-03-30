import bridge from '@vkontakte/vk-bridge';
import {
  Card,
  Text,
  ActionSheet,
  ActionSheetItem,
  Button,
  Spinner,
  SimpleCell,
  Avatar,
  IconButton,
  Alert,
} from '@vkontakte/vkui';
import {
  Icon28LikeOutline,
  Icon28LikeFillRed,
  Icon28CommentOutline,
  Icon28ShareOutline,
  Icon28StoryOutline,
} from '@vkontakte/icons';
import '../../css/memes.css';
import Actions from '../../store/Actions';
import State from '../../store/State';
import { useCallback, useRef } from 'react';
import { Icon28MoreHorizontal } from '@vkontakte/icons';
import User from '../../store/User';
import { modals, routes } from '../../types/enums';
import ReportInfo, { ReportInfoType } from '../UI/ReportInfo';
import { More } from '../UI/More';

const moderation = async (meme: number, decision: boolean): Promise<void> => {
  const moderation = await Actions.sendRequest('moderation', {
    decision: decision,
    meme: meme
  }).then(res => res);

  if (decision) {
    const wall = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'wall.post', params: {
        owner_id: -Number(process.env.REACT_APP_GROUP),
        v: '5.131',
        from_group: 1,
        attachments: moderation.data.attachments,
        close_comments: 0,
        access_token: moderation.data.access_token,
      }
    }).then(res => res);

    await Actions.sendRequest('updateAttachments', { post_id: wall.response.post_id, meme: meme });
  }
  State.markModeration();
}

const sendOpinion = (meme: Imeme): void => {
  Actions.sendRequest('like', { meme: meme.id, opinion: !meme.opinion });
  State.memeOpinion(meme.id);
}

const share = (ref: React.MutableRefObject<HTMLDivElement>, data: Imeme): JSX.Element => {
  return (
    <ActionSheet toggleRef={ref} onClose={() => State.setPopout(null)}>
      <ActionSheetItem onClick={() => toWall(data)} autoclose before={<Icon28ShareOutline />}>
        Поделиться на стене
      </ActionSheetItem>
      <ActionSheetItem autoclose before={<Icon28StoryOutline />}>
        Поделиться в истории
      </ActionSheetItem>
    </ActionSheet>
  );
}

const toWall = (data: Imeme): void => {
  const message = 'Хочешь ржачных приколов?😜\nЗаходи на фабрику мемов! С каждым лайком и репостом где-то улыбается наш админ😉\n#мемы #приколы #ФабрикаМемов';
  bridge.send('VKWebAppShowWallPostBox', {
    message: message,
    attachments: data.attachments + ',' + 'https://vk.com/app' + process.env.REACT_APP_ID
  }).then(res => {
    if (res.post_id > 0) {
      Actions.sendRequest('share', { meme: data.id });
      State.memeShare(data.id);
    }
  });
}

export const Meme = ({ data }: { data: Imeme }): JSX.Element => {

  const url = data.url !== '' ? process.env.REACT_APP_API + '/uploads/' + data.url : data.vk_url;

  const like = data.opinion ? <Icon28LikeFillRed /> : <Icon28LikeOutline />;
  const refShare: React.MutableRefObject<HTMLDivElement> = useRef();
  const refMore: React.MutableRefObject<HTMLDivElement> = useRef();

  const onShareClick = (ref: React.MutableRefObject<HTMLDivElement>, data: Imeme) => {
    if (State.getStories()) {
      State.setPopout(share(ref, data))
    } else {
      toWall(data)
    }
  }

  const onProfileClick = useCallback(()=>{
    State.goToPage(routes.USERPROFILE); 
    Actions.getDataUserProfile(data.user_id);
  }, [data.user_id])

  return (
    <>
      <SimpleCell
        description={data.time}
        disabled
        before={<Avatar style={{ cursor: 'pointer' }} src={data.avatar} onClick={onProfileClick} />}
        after={
          data.status === 1 ?
            <IconButton
              onClick={() => State.setPopout(<More refMore={refMore} data={data}/>)}
            >
              <Icon28MoreHorizontal getRootRef={refMore} />
            </IconButton> : null
        }
      >
        <div style={{ display: 'flex' }}>
          <Text onClick={onProfileClick} style={{ cursor: 'pointer' }}>{data.name}</Text>
          <ReportInfo reports={data.strikes} type={ReportInfoType.meme}/>
        </div>

      </SimpleCell>
      <Card mode='shadow' className='meme-card'>
        <div id={'meme' + data.id} className='meme'>
          {url ? <img src={url} alt='meme' className='meme-img' /> : <Spinner size='regular' />}
        </div>

        {data.status === 1 && <div className='meme-buttons'>
          <div className='like' onClick={() => sendOpinion(data)}>
            {like}
            <Text weight='2' className='buttons-text'>
              {data.likes}
            </Text>
          </div>
          <div className='comments' onClick={() => { State.setMemeOpen(data.id) }}>
            <Icon28CommentOutline />
            <Text weight='2' className='buttons-text'>
              {data.comments}
            </Text>
          </div>
          <div className='share' onClick={() => onShareClick(refShare, data)}>
            <Icon28ShareOutline getRootRef={refShare} />
            <Text weight='2' className='buttons-text'>
              {data.share}
            </Text>
          </div>
        </div>}

        {data.status === 0 && State.getActivePanel() === routes.ADMIN ?
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button size='l' onClick={() => moderation(data.id, true)} stretched>Принять</Button>
            <Button size='l' onClick={() => moderation(data.id, false)} stretched mode='secondary'>Отклонить</Button>
          </div>
          : null}
        {data.status === 2 && <div className='rejection'>Отклонён</div>}
        {data.status === 0 && State.getActivePanel() !== routes.ADMIN ? <div className='rejection in-moderation'>На модерации</div> : null}
      </Card>
    </>
  );
}