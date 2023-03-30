import {
	Tabs,
	HorizontalScroll,
	TabsItem
} from '@vkontakte/vkui';
import { memes } from '../../types/enums';
import State from '../../store/State';
import { observer } from 'mobx-react-lite';

export default observer((): JSX.Element => {
	return (
    <Tabs>
      <HorizontalScroll>
        <TabsItem
          onClick={() => State.setCategory(memes.TIME)}
          selected={State.getCategory() === memes.TIME}
        >Новое</TabsItem>
        <TabsItem
          onClick={() => State.setCategory(memes.TOP_ALL)}
          selected={State.getCategory() === memes.TOP_ALL}
        >Лучшее</TabsItem>
        <TabsItem
          onClick={() => State.setCategory(memes.TOP_WEEK)}
          selected={State.getCategory() === memes.TOP_WEEK}
        >Топ недели</TabsItem>
        <TabsItem
          onClick={() => State.setCategory(memes.TOP_DAY)}
          selected={State.getCategory() === memes.TOP_DAY}
        >Топ дня</TabsItem>
        <TabsItem
          onClick={() => State.setCategory(memes.FAVORITE)}
          selected={State.getCategory() === memes.FAVORITE}
        >Любимые</TabsItem>
        <TabsItem
          onClick={() => State.setCategory(memes.MY)}
          selected={State.getCategory() === memes.MY}
        >Мои</TabsItem>
      </HorizontalScroll>
    </Tabs>
	);
});