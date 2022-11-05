import React, { useState } from 'react';
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

const Subscribe = () => {
  const [notif, setNotif] = useState(User.isNotif());
  const [subscribe, setSubscribe] = useState(User.isSubscribe());

	return (
    <Group
      header={<Header mode='secondary'>Будь ВКонтакте</Header>}
      description='Подпишись на уведомления и вступи в группу, чтобы не пропустить новые мемы. Получи возможность публиковать свои мемы 3 раза в день'
      separator='show'>
      <Cell before={<Icon28Notifications />} after={<Checkbox checked={notif}></Checkbox>}>Уведомления</Cell>
      <Cell before={<Icon28Users3Outline />} after={<Checkbox checked={subscribe}></Checkbox>}>Группа</Cell>
    </Group>
	);
}

export default Subscribe;