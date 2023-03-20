import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  FixedLayout,
} from '@vkontakte/vkui';
import State from '../store/State';
import { routes } from '../types/enums';
import Tabbar from '../components/Tabbar';
import { Icon28CupOutline } from '@vkontakte/icons';
import '../css/rating.css';
import { CategoriesRating } from '../components/CategoriesRating';
import { RatingList } from '../components/RatingList';
import { observer } from 'mobx-react-lite';
import { RatingInfoBlock } from '../components/RatingInfoBlock';

export const Rating = observer(({ id }: IpanelProps) => {

  return (
    <Panel id={id}>
      <FixedLayout vertical='top'>
        <PanelHeader
          before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
        >
          <div className='rating-header-text'>
            <Icon28CupOutline />
            Рейтинг
          </div>
        </PanelHeader>
        <CategoriesRating />
      </FixedLayout>
      <div style={{ width: '100%', height: '120px' }}></div>
      <RatingInfoBlock/>
      <RatingList />
      <Tabbar />
    </Panel>
  );
})