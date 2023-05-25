import { Panel, Button } from '@vkontakte/vkui';
import '../css/intro.css';
import State from '../store/State';
import { routes } from '../types/enums';
import { useEffect } from 'react';
import Analytics from '../store/Analytics';

export const IntroFirst = ({ id }: IpanelProps) => {
  useEffect(() => {
    Analytics.track('tutorial', 'hello');
  }, [])

  return (
    <Panel id={id}>
      <div className='intro'>
        <div className='intro-header'>Добро пожаловать<br />на <b>фабрику мемов!</b></div>
        <div className='intro-logo' />
        <div className='intro-descr'>Здесь можно кекнуть с чужих мемасов<br />либо залить свой.</div>
        <div className='intro-button'>
          <Button size='m' onClick={() => {
            State.goToPage(routes.INTROSECOND);
            Analytics.track('tutorial', 'continue');
          }}
          >
            Продолжить
          </Button>
        </div>
        <div className='intro-continue-info'>
          Нажимая на «продолжить», вы соглашаетесь с <span className='intro-continue-info-link' onClick={() => { State.goToPage(routes.RULES) }}>правилами использования сервиса</span>
        </div>
      </div>
    </Panel>
  );
}