import bridge from '@vkontakte/vk-bridge';
import {
  Card,
  Text,
  ActionSheet,
  ActionSheetItem,
  Button
} from '@vkontakte/vkui';
import {
  Icon28LikeOutline,
  Icon28LikeFillRed,
  Icon28CommentOutline,
  Icon28ShareOutline,
  Icon28StoryOutline
} from '@vkontakte/icons';
import '../css/memes.css';
import Actions from '../store/Actions';
import State from '../store/State';
import { useRef } from 'react';
import { load } from '../types/enums';

const moderation = (meme: number, decision: boolean): void => {
  Actions.sendRequest('moderation', {
    decision: decision,
    meme: meme
  }).then(res => {
    const token = 'vk1.a.mTxCrQOEURMpfq5t2Kw3cNfzTDXy_2a7CV1u8ynMrVvLxxwB418eckAenWLo27YRLk4zGhhoDHM2BtJaMmUeO5q-GcJITDMp5gOCRzbsTj4_VzXCCs2u7wg5CWWy54yng2SCftYUSrDW5sYNsapCI5lSG4G6ZBxSVZT7oswoRX3f8PoKcBcJKQptblQ8qSLxwWE-M3BM50A5Nl4IkEnmJQ';
    bridge.send('VKWebAppCallAPIMethod', { method: 'wall.post', params: {
      owner_id: -Number(process.env.REACT_APP_GROUP),
      v: '5.131',
      from_group: 1,
      attachments: res.data,
      close_comments: 0,
      access_token: token,
    }});
    State.setMemes([]);
    State.setMemesIteration(0);
    State.setLoadMemes(load.LAZY);
  });
}

const sendOpinion = (meme: Imeme): void => {
  Actions.sendRequest('like', {meme: meme.id, opinion: !meme.opinion});
  State.memeOpinion(meme.id);
}

const share = (ref: React.MutableRefObject<HTMLDivElement>): JSX.Element => {
  return (
    <ActionSheet toggleRef={ref} onClose={() => State.setPopout(null)}>
      <ActionSheetItem autoclose before={<Icon28ShareOutline />}>
        Поделиться на стене
      </ActionSheetItem>
      <ActionSheetItem autoclose before={<Icon28StoryOutline />}>
        Поделиться в истории
      </ActionSheetItem>
    </ActionSheet>
  );
}

export default ({data}: {data: Imeme}): JSX.Element => {
  const url = data.url !== '' ? process.env.REACT_APP_API + '/uploads/' + data.url : data.vk_url;
  const img = new Image();
  img.src = url;
  img.onload = (): void => {
    const el = document.querySelector('#meme' + data.id) as HTMLElement;
    const width = el.clientWidth;
    const height = width / img.width * img.height;
    el.style.height = height + 'px';
    el.style.backgroundImage = 'url(' + url + ')';
  }
  const like = data.opinion ? <Icon28LikeFillRed /> : <Icon28LikeOutline />;
  const ref: React.MutableRefObject<HTMLDivElement> = useRef();
  
  return (
    <Card mode='shadow' className='meme-card'>
      <div id={'meme' + data.id} className='meme' onClick={() => console.log(data.id)}></div>
      <div className='meme-buttons'>
        <div className='like' onClick={() => sendOpinion(data)}>{like}<Text weight='2' className='buttons-text'>{data.likes}</Text></div>
        <div className='comments'><Icon28CommentOutline /><Text weight='2' className='buttons-text'>{data.comments}</Text></div>
        <div className='share' onClick={() => State.setPopout(share(ref))}><Icon28ShareOutline getRootRef={ref} /><Text weight='2' className='buttons-text'>{data.share}</Text></div>
      </div>
      {data.status === 0 && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button size='l' onClick={() => moderation(data.id, true)} stretched>Принять</Button>
        <Button size='l' onClick={() => moderation(data.id, false)} stretched mode='secondary'>Отклонить</Button>
      </div>}
    </Card>
  );
}