import {
  Tabs,
  HorizontalScroll,
  TabsItem
} from '@vkontakte/vkui';
import { ratings } from '../../types/enums';
import State from '../../store/State';
import { observer } from 'mobx-react-lite';

export const CategoriesRating = observer((): JSX.Element => {

  return (
    <Tabs>
      <HorizontalScroll>
        <TabsItem
          style={{ flexBasis: '50%' }}
          onClick={() => State.setRatingCategory(ratings.TOP_ALL)}
          selected={State.getRatingCategory() === ratings.TOP_ALL}
        >
          ТОП участников
        </TabsItem>
        <TabsItem
          style={{ flexBasis: '50%' }}
          onClick={() => State.setRatingCategory(ratings.TOP_WEEK)}
          selected={State.getRatingCategory() === ratings.TOP_WEEK}
        >
          ТОП недели
        </TabsItem>
      </HorizontalScroll>
    </Tabs>
  );
});