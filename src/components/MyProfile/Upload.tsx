import bridge, { EAdsFormats } from '@vkontakte/vk-bridge';
import {
  Button,
  Group,
  Header,
  FormItem,
  File,
  Text,
  Spinner,
  Alert,
} from '@vkontakte/vkui';
import {
  Icon24Camera,
  Icon16Add,
  Icon24VideoAdvertisement
} from '@vkontakte/icons';
import { observer } from 'mobx-react-lite';
import md5 from 'md5';
import State from '../../store/State';
import { popouts, upload } from '../../types/enums';
import axios from 'axios';
import User from '../../store/User';
import Actions from '../../store/Actions';

const AlertFile = () => {
  return (<Alert
    actions={[{
      title: 'Понятно',
      autoclose: true,
      mode: 'cancel'
    }]}
    onClose={() => State.setPopout(null)}
  >
    <p>Файл должен быть формата .jpeg или .png, размером меньше 2 мб</p>
  </Alert>)
}

const handleSelectedFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const file = e.target.files[0];
  if ((file.type === 'image/png' || file.type === 'image/jpeg') && (!/.jfif/i.test(file.name))) {
    if (file.size / 1024 < 2048) {
      State.setFile(file);
      State.setUploadState(upload.BUTTONS);
    } else {
      State.setPopout(<AlertFile />, popouts.ALERT);
    }
  } else {
    State.setPopout(<AlertFile />, popouts.ALERT);
  }
}

const buttons = (): JSX.Element => {
  const file = State.getFile();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text weight='2' style={{ marginBottom: 16 }}>{file.name.length > 25 ? file.name.substring(0, 25) + '...' : file.name}</Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size='m' style={{ marginRight: 4 }} onClick={() => sendMem()}>Запостить</Button>
        <Button size='m' mode='secondary' style={{ marginLeft: 4 }} onClick={() => State.setUploadState(upload.INPUT)}>Отмена</Button>
      </div>
    </>
  );
}

const inputFile = (): JSX.Element => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Text weight='2'>Осталось жетонов: {User.getMemes()}</Text>
        {State.getReward() && <Button mode='secondary' style={{ marginLeft: '4px' }} before={<Icon16Add />} onClick={() => showRewarded()}></Button>}
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '25px' }}>
        <File
          before={<Icon24Camera role='presentation' />}
          size='l'
          accept='image/png, image/jpeg'
          onChange={handleSelectedFile}
          align='center'
        >
          Открыть галерею
        </File>
      </div>


    </>
  );
}

const loading = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Spinner size='regular' />
    </div>
  );
}

const finish = (): JSX.Element => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text weight='2' style={{ color: 'green', textAlign: 'center' }}>Твой мем загружен! После проверки, модератор опубликует его.</Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size='m' style={{ marginTop: 10 }} onClick={() => State.setUploadState(upload.INPUT)}>Понятно</Button>
      </div>
    </>
  );
}

const error = (): JSX.Element => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text weight='2' style={{ color: 'red', textAlign: 'center' }}>
          Ошибка загрузки файла.
          <br />
          Файл должен быть формата .jpeg или .png, размером меньше 2 мб
        </Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size='m' style={{ marginTop: 10 }} onClick={() => State.setUploadState(upload.INPUT)}>Понятно</Button>
      </div>
    </>
  );
}

const ad = (): JSX.Element => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text weight='2' style={{ color: 'red', textAlign: 'center' }}>У тебя 0 жетонов</Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Text weight='2' style={{ textAlign: 'center' }}>До ежедневного начисления осталось {timer()}</Text>
      </div>
      {State.getReward() && <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text weight='3' style={{ textAlign: 'center' }}>Вы можете получить жетон за рекламу</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button size='m' style={{ marginTop: 10 }} before={<Icon24VideoAdvertisement />} onClick={() => showRewarded()}>Смотреть рекламу</Button>
        </div>
      </>}
    </>
  );
}

const sendMem = (): void => {
  State.setUploadState(upload.LOADING);
  const file = State.getFile();
  const data = new FormData();
  data.append('file', file, file.name);
  data.append('id', User.getUser().id.toString());
  data.append('search', window.location.search);
  axios.post(process.env.REACT_APP_API + '/upload', data).then(res => {
    res.data.error ? State.setUploadState(upload.ERROR) : State.setUploadState(upload.FINISH);
    !res.data.error && User.setMemes(res.data.data.memes);
  });
}

const timer = (): string => {
  const hours = Math.floor(State.getTimer() / (60 * 60));
  const minutes = Math.floor((State.getTimer() - (hours * 60 * 60)) / 60);
  const seconds = State.getTimer() - (hours * 60 * 60) - minutes * 60;
  return hours + ':' + (minutes.toString().length === 1 ? '0' + minutes : minutes) + ':' + (seconds.toString().length === 1 ? '0' + seconds : seconds);
}

const showRewarded = (): void => {
  bridge.send('VKWebAppShowNativeAds', { ad_format: EAdsFormats.REWARD }).then(data => {
    if (data.result) {
      const hash = md5(User.getNickname() + '_' + User.getUser().id + '_' + User.getMemes());
      Actions.sendRequest('rewardedMeme', { hash }).then(res => {
        !res.error && User.setMemes(User.getMemes() + 1);
      });
    }
  }).catch(error => {
    console.log(error);
  });
}

export default observer((): JSX.Element => {
  const state = State.getUploadState();
  const jsx = state === upload.BUTTONS ? buttons() :
    state === upload.LOADING ? loading() :
      state === upload.FINISH ? finish() :
        state === upload.ERROR ? error() :
          state === upload.INPUT && User.getMemes() === 0 ? ad() :
            inputFile();
  return (
    <Group header={<Header mode='secondary'>Загрузить свой мем</Header>}>
      <FormItem style={{ overflow: 'hidden' }}>{jsx}</FormItem>
    </Group>
  );
});