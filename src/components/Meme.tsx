import { Card, Text } from '@vkontakte/vkui';
import {
  Icon28LikeOutline,
  Icon28LikeFillRed,
  Icon28CommentOutline,
  Icon28ShareOutline
} from '@vkontakte/icons';
import '../css/memes.css';

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
  return (
    <Card mode='shadow' className='meme-card'>
      <div id={'meme' + data.id} className='meme' onClick={() => console.log(data.id)}></div>
      <div className='meme-buttons'>
        <div className='like' onClick={() => console.log('like')}><Icon28LikeOutline color='red' /><Text weight='2' className='buttons-text'>{data.likes}</Text></div>
        <div className='comments'><Icon28CommentOutline /><Text weight='2' className='buttons-text'>{data.comments}</Text></div>
        <div className='share' onClick={() => console.log('share')}><Icon28ShareOutline /><Text weight='2' className='buttons-text'>{data.share}</Text></div>
      </div>
    </Card>
  );
}