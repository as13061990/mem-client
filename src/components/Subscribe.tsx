import bridge from '@vkontakte/vk-bridge';
import {
  Group,
  Header,
  Cell,
  Checkbox
} from '@vkontakte/vkui';
import {
	Icon28Notifications,
  Icon28Users3Outline
} from '@vkontakte/icons';
import User from '../store/User';
import { observer } from 'mobx-react-lite';

const notify = (): void => {
  if (User.isNotify()) {
    bridge.send('VKWebAppDenyNotifications', {}).then((data) => {
      if (data.result) {
        User.setNotify(false);
      }
    });
  } else {
    bridge.send('VKWebAppAllowNotifications', {}).then((data) => {
      if (data.result) {
        User.setNotify(true);
      }
    });
  }
}

const subscribe = (): void => {
  if (User.isSubscribe()) {
    bridge.send('VKWebAppLeaveGroup', { group_id: Number(process.env.REACT_APP_GROUP) }).then(data => {
      if (data.result) {
        User.setSubscribe(false);
      }
    });
  } else {
    bridge.send('VKWebAppJoinGroup', { group_id: Number(process.env.REACT_APP_GROUP) }).then(data => {
      if (data.result) {
        User.setSubscribe(true);
      }
    });
  }
}

export default observer(() => {
	return (
    <Group
      header={<Header mode='secondary'>Будь ВКонтакте</Header>} description='Подпишись на уведомления и вступи в группу, чтобы не пропустить новые мемы. Получи возможность публиковать свои мемы 3 раза в день'>
      <Cell
        onClick={() => notify()}
        before={<Icon28Notifications />}
        after={<Checkbox disabled checked={User.isNotify()}></Checkbox>}
      >Уведомления</Cell>
      <Cell
        onClick={() => subscribe()}
        before={<Icon28Users3Outline />}
        after={<Checkbox disabled checked={User.isSubscribe()}></Checkbox>}
      >Группа</Cell>
    </Group>
	);
});