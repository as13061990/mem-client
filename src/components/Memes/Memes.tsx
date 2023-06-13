import { useEffect } from 'react';
import { Spinner, Text } from '@vkontakte/vkui';
import Actions from '../../store/Actions';
import { load, routes } from '../../types/enums';
import { observer } from 'mobx-react-lite';
import State from '../../store/State';
import '../../css/memes.css';
import { Meme } from './Meme';
import { CommentsBlock } from '../Comments/CommentsBlock';

const lazyLoad = (): void => {
  const more = document.querySelector('#more-memes');

  if (more) {
    const bounds = more.getBoundingClientRect();
    const targetPosition = {
      top: window.pageYOffset + bounds.top,
      left: window.pageXOffset + bounds.left,
      right: window.pageXOffset + bounds.right,
      bottom: window.pageYOffset + bounds.bottom
    }
    const windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    }

    if (targetPosition.bottom > windowPosition.top &&
      targetPosition.top < windowPosition.bottom &&
      targetPosition.right > windowPosition.left &&
      targetPosition.left < windowPosition.right) {
      loadMemes();
    }
  }
}

const loadMemes = (): void => {
  if (State.getLoadMemes() !== load.LAZY) return;
  State.setLoadMemes(load.LOADING);
  const type = State.getActivePanel() !== routes.ADMIN ? State.getCategory() : 0;

  let data
  if (State.getActivePanel() === routes.USERMEMES) {
    data = {
      i: State.getMemesIteration(),
      type: type,
      user: State.getUserProfile().id
    }
  } else {
    data = {
      i: State.getMemesIteration(),
      type: type
    }
  }

  Actions.sendRequest('loadMemes', data).then(res => {
    if (State.getActivePanel() !== routes.ADMIN && type !== State.getCategory()) return;
    State.setMemesIteration(State.getMemesIteration() + 1);
    const loading = res.data.more ? load.LAZY : load.END;
    State.addMemes(res.data.memes);
    State.setLoadMemes(loading);
  });
}

export default observer((): JSX.Element => {
  const category = State.getCategory()
  const moderation = State.getModeration()

  useEffect((): void => {
    State.setMemesIteration(0);
    State.setMemes([]);
    State.setLoadMemes(load.LAZY);
    window.addEventListener('scroll', (): void => lazyLoad());
    loadMemes();
  }, [category, moderation]);

  const lazy = State.getLoadMemes() === load.LAZY ? <div id='more-memes'></div> :
    State.getLoadMemes() === load.LOADING ?
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}><Spinner size='regular' /></div> :
      State.getMemes().length === 0 ?
        <Text weight='2' style={{ textAlign: 'center', marginTop: '20px' }}>Мемов нет, но вы держитесь</Text>
        : null

  const memes = State.getMemes().map(data => {
    return (
      <Meme key={data.id} data={data} />
    );
  });

  return (
    <div>
      {memes}
      {State.getSnackbar()}
      <CommentsBlock />
      {lazy}
    </div>
  );
});