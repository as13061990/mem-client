import { Panel, Button } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import '../css/intro.css';
import State from '../store/State';
import { routes } from '../types/enums';

export const IntroFirst = ({ id }: IpanelProps) => {
  return (
    <Panel id={id}>
      <div className='intro'>
        <div className='intro-header'>Добро пожаловать<br />на <b>фабрику мемов!</b></div>
        <div className='intro-logo' />
        <div className='intro-descr'>Здесь можно кекнуть с чужих мемасов,<br />либо залить свой.</div>
        <div className='intro-button'>
          <Button size='m' onClick={() => {
            State.goToPage(routes.INTROSECOND)
          }}
          >
            Продолжить
          </Button>
        </div>
        <div className='intro-continue-info'>
          нажимая на «продолжить», вы соглашаетесь с <span className='intro-continue-info-link' onClick={() => { State.goToPage(routes.RULES) }}>правилами использования сервиса</span>
        </div>
      </div>
    </Panel>
  );
}