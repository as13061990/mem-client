import { useEffect } from 'react';
import { Spinner } from '@vkontakte/vkui';
import Actions from '../store/Actions';
import { load, memes } from '../types/enums';
import { observer } from 'mobx-react-lite';
import State from '../store/State';
import '../css/memes.css';
import Meme from './Meme';

const lazyLoad = (type: memes): void => {
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
      loadMemes(type);
    }
  }
}

const loadMemes = (type: memes): void => {
  if (State.getLoadMemes() !== load.LAZY) return;
  State.setLoadMemes(load.LOADING);

  Actions.sendRequest('loadMemes', {
    i: State.getMemesIteration(),
    type: type
  }).then(res => {
    State.setMemesIteration(State.getMemesIteration() + 1);
    const loading = res.data.more ? load.LAZY : load.END;
    State.addMemes(res.data.memes);
    State.setLoadMemes(loading);
  });
}

export default observer(({type}: {type: memes}): JSX.Element => {
  useEffect(() => {
    State.setMemesIteration(0);
    State.setMemes([]);
    State.setLoadMemes(load.LAZY);
    window.addEventListener('scroll', (): void => lazyLoad(type));
    loadMemes(type);
  }, []);
  
  const lazy = State.getLoadMemes() === load.LAZY ? <div id='more-memes'></div> :
    State.getLoadMemes() === load.LOADING ? <div style={{ display: 'flex', justifyContent: 'center' }}><Spinner size='regular' /></div> :
    null;

  const memes = State.getMemes().map(data => {
    return (
      <Meme key={data.id} data={data} />
    );
  });

  return (
    <div style={{paddingTop: 50}}>
      {memes}
      {lazy}
    </div>
  );
});