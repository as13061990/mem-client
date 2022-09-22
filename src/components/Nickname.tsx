import React, { useState } from 'react';
import {
  Alert,
	Group,
	Avatar,
	RichCell,
	Button,
  Input,
  Checkbox
} from '@vkontakte/vkui';
import User from '../store/User';
import { observer } from 'mobx-react-lite';
import State from '../store/State';
import Actions from '../store/Actions';

const save = (name: string, checked: boolean, setChange: React.Dispatch<React.SetStateAction<boolean>>) => {
  const reg = /^[a-zA-Zа-яА-Я]+$/;

  if (reg.test(name) && name.length > 2 && name.length <= 20) {
    Actions.setName(name, checked);
    setChange(false);
  } else {
    State.setPopout(
      <Alert
        actions={[{
          title: 'Понятно',
          autoclose: true,
          mode: 'cancel'
        }]}
        onClose={() => State.setPopout(null)}
      >
        <p>Никнейм должен состоять только из букв, длиной не менее двух и не более 20 символов</p>
      </Alert>
    );
  }
}

const Nickname = observer(() => {
  const [checked, setChecked] = useState(User.getUseNickname());
  const [name, setNickname] = useState(User.getNickname());
  const [change, setChange] = useState(false);

	const user = User.getUser();
  return (
    <>
      {change ?
      <Group>
        <RichCell
          disabled
          before={<Avatar size={72} src={user.photo_200} />}
          actions={
            <React.Fragment>
              <Button onClick={() => save(name, checked, setChange)}>Сохранить</Button>
              <Button mode='secondary'onClick={() => setChange(!change)}>Отменить</Button>
            </React.Fragment>
          }
        >
          <Input type='text' onChange={(e) => setNickname(e.target.value)} defaultValue={name} placeholder='Введите никнейм' />
          <Checkbox defaultChecked={checked} onChange={(e) => setChecked(e.target.checked)}>Использовать никнейм</Checkbox>
        </RichCell>
      </Group>
      :
      <Group>
        <RichCell
          disabled
          before={<Avatar size={72} src={user.photo_200} />}
          actions={
            <Button onClick={() => setChange(!change)}>Сменить никнейм</Button>
          }
        >
          {User.getUseNickname() ? User.getNickname() : user.first_name}
        </RichCell>
      </Group>}
    </>
  );
});

export default Nickname;