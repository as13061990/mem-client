import {
  Icon28CommentOutline,
  Icon28LikeFillRed,
  Icon28LikeOutline,
  Icon28ShareOutline,
  Icon28StoryOutline
} from "@vkontakte/icons";
import {
  ActionSheet,
  ActionSheetItem,
  Alert,
  Text
} from "@vkontakte/vkui";
import Actions from "../../store/Actions";
import State from "../../store/State";
import bridge from '@vkontakte/vk-bridge';
import { useCallback, useRef } from 'react';
import { observer } from "mobx-react-lite";
import { popouts } from "../../types/enums";

interface ImemeButtonsProps {
  data: Imeme
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
    attachments: data.attachments + ',https://vk.com/app' + process.env.REACT_APP_ID
  }).then(res => {
    if (Number(res.post_id) > 0) {
      Actions.sendRequest('share', { meme: data.id });
      State.memeShare(data.id);
      State.setPopout(<Alert
        actions={[{
          title: 'Понятно',
          autoclose: true,
          mode: 'cancel'
        }]}
        onClose={() => State.setPopout(null)}
      >
        <p>Пост был успешно опубликован на вашу страницу</p>
      </Alert>, popouts.ALERT)
    }
  });
}

export const MemeButtons = observer(({ data }: ImemeButtonsProps): JSX.Element => {

  const like = data.opinion ? <Icon28LikeFillRed /> : <Icon28LikeOutline />;

  const onShareClick = useCallback((ref: React.MutableRefObject<HTMLDivElement>, data: Imeme) => {
    if (State.getStories()) {
      State.setPopout(share(ref, data), popouts.ACTION)
    } else {
      toWall(data)
    }
  }, [])

  const refShare: React.MutableRefObject<HTMLDivElement> = useRef();

  if (data.status === 1) {
    return (<div className='meme-buttons'>
      <div className='like' onClick={() => sendOpinion(data)}>
        {like}
        <Text weight='2' className='buttons-text'>
          {data.likes}
        </Text>
      </div>
      <div className='comments' onClick={() => { State.setMemeOpen(data.id); State.setPopout(null, popouts.COMMENTS) }}>
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
    </div>)
  }
  return null

});
