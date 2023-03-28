import { Panel, Button, FixedLayout, PanelHeaderBack } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import '../css/intro.css';
import State from '../store/State';
import { routes } from '../types/enums';

export const IntroSecond = ({ id }: IpanelProps) => {
  return (
    <Panel id={id}>
      <FixedLayout vertical='top'>

        <PanelHeaderBack onClick={() => window.history.back()} />

      </FixedLayout>
      <div className='intro'>
        <div className='intro-header'>Добро пожаловать<br />на <b>фабрику мемов!</b></div>
        <div className='intro-logo' />
        <div className='intro-notif'>
          Подпишись на уведомления,
          <br />чтобы не пропустить самое интересное:
          <br /> - Новые публикации
          <br /> - Публикация вашего контента</div>
        <div className='intro-button'>
          <Button size='m' onClick={() => {
            bridge.send('VKWebAppAllowNotifications', {}).then(res => {
              if (res.result) {
                State.setActivePanel(routes.HOME)
                State.setHistory([routes.HOME])
              }
            });
          }}
          >
            Подписаться
          </Button>
          <Button
            size='m'
            mode="tertiary"
            style={{display: 'block', margin: '10px auto 0 auto'}}
            onClick={() => { State.setActivePanel(routes.HOME); State.setHistory([routes.HOME]) }}
          >
            Пропустить
          </Button>
        </div>
      </div>
    </Panel>
  );
}