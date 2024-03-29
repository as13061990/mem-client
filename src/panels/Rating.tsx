import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FixedLayout,
} from '@vkontakte/vkui';
import Tabbar from '../components/UI/Tabbar';
import { Icon28CupOutline } from '@vkontakte/icons';
import '../css/rating.css';
import { CategoriesRating } from '../components/Rating/CategoriesRating';
import { RatingList } from '../components/Rating/RatingList';
import { RatingInfoBlock } from '../components/Rating/RatingInfoBlock';
import { useEffect } from "react";
import Actions from '../store/Actions';
import State from '../store/State';
import { observer } from 'mobx-react-lite';

export const Rating = observer(({ id }: IpanelProps) => {

  useEffect(() => {
    Actions.getDataRatingUsers()
    const fetch = () => {
      setTimeout(() => {
        Actions.getDataRatingUsers()
      }, 4000)
    }
    window.addEventListener('online', fetch);
    return () => {
      window.removeEventListener('online', fetch);
    };
  }, [])

  return (
    <Panel id={id}>
      <FixedLayout vertical='top'>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => window.history.back()} />}
        >
          <div className='rating-header-text'>
            <Icon28CupOutline />
            Рейтинг
          </div>
        </PanelHeader>
        <CategoriesRating />
      </FixedLayout>
      {State.getPlatform() === 'mobile_iphone' ? <div style={{ width: '100%', height: '62px' }}></div> : null}
      <div style={{ width: '100%', height: '100px' }}></div>
      <div className='header-space' />
      <RatingInfoBlock />
      <RatingList />
      {State.getPlatform() === 'mobile_iphone' ? <div style={{ width: '100%', height: '42px' }}></div> : null}
      <div style={{ width: '100%', height: '40px' }}></div>
      <Tabbar />
    </Panel>
  );
})