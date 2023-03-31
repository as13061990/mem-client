import {
  Tabs,
  HorizontalScroll,
  TabsItem
} from '@vkontakte/vkui';
import { admins } from '../../types/enums';
import State from '../../store/State';
import { observer } from 'mobx-react-lite';

export const CategoriesAdmin = observer((): JSX.Element => {

  return (
    <Tabs>
      <HorizontalScroll>
        <TabsItem
          style={{ flexBasis: '33%' }}
          onClick={() => State.setAdminCategory(admins.MEMES)}
          selected={State.getAdminCategory() === admins.MEMES}
        >
          Мемы
        </TabsItem>
        <TabsItem
          style={{ flexBasis: '34%' }}
          onClick={() => State.setAdminCategory(admins.USERS)}
          selected={State.getAdminCategory() === admins.USERS}
        >
          Пользователи
        </TabsItem>
        <TabsItem
          style={{ flexBasis: '33%' }}
          onClick={() => State.setAdminCategory(admins.COMMENTS)}
          selected={State.getAdminCategory() === admins.COMMENTS}
        >
          Комментарии
        </TabsItem>
      </HorizontalScroll>
    </Tabs>
  );
});