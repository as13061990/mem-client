import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FixedLayout,
} from '@vkontakte/vkui';
import Tabbar from '../components/Tabbar';
import { Icon28CupOutline } from '@vkontakte/icons';
import '../css/rating.css';
import { CategoriesRating } from '../components/Rating/CategoriesRating';
import { RatingList } from '../components/Rating/RatingList';
import { RatingInfoBlock } from '../components/Rating/RatingInfoBlock';
import { useEffect } from "react";
import Actions from '../store/Actions';

export const Rating = ({ id }: IpanelProps) => {
  useEffect(()=>{
    Actions.getDataRatingUsers()
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
      </FixedLayout>%
      <RatingInfoBlock/>
      <RatingList />
      <Tabbar />
    </Panel>
  );
}