import {
  Card,
  Text,
  Spinner,
  SimpleCell,
  Avatar,
  IconButton,
} from '@vkontakte/vkui';
import '../../css/memes.css';
import Actions from '../../store/Actions';
import State from '../../store/State';
import { useCallback, useRef } from 'react';
import { Icon28MoreHorizontal } from '@vkontakte/icons';
import { routes } from '../../types/enums';
import ReportInfo, { ReportInfoType } from '../UI/ReportInfo';
import { More } from '../UI/More';
import { StatusBlock } from './StatusBlock';
import { MemeButtons } from './MemeButtons';


export const Meme = ({ data }: { data: Imeme }): JSX.Element => {

  const url = data.url !== '' ? process.env.REACT_APP_API + '/uploads/' + data.url : data.vk_url;

  const refMore: React.MutableRefObject<HTMLDivElement> = useRef();

  const onProfileClick = useCallback(()=>{
    State.goToPage(routes.USERPROFILE); 
    Actions.getDataUserProfile(data.user_id);
  }, [data.user_id])

  return (
    <>
      <SimpleCell
        description={data.time}
        disabled
        before={<Avatar style={{ cursor: 'pointer' }} src={data.avatar} onClick={onProfileClick} />}
        after={
          data.status === 1 ?
            <IconButton
              onClick={() => State.setPopout(<More refMore={refMore} data={data}/>)}
            >
              <Icon28MoreHorizontal getRootRef={refMore} />
            </IconButton> : null
        }
      >
        <div style={{ display: 'flex' }}>
          <Text onClick={onProfileClick} style={{ cursor: 'pointer' }}>{data.name}</Text>
          <ReportInfo reports={data.strikes} type={ReportInfoType.meme}/>
        </div>

      </SimpleCell>
      <Card mode='shadow' className='meme-card'>
        <div id={'meme' + data.id} className='meme'>
          {url ? <img src={url} alt='meme' className='meme-img' /> : <Spinner size='regular' />}
        </div>
        <MemeButtons data={data}/>
        <StatusBlock data={data}/>
      </Card>
    </>
  );
}