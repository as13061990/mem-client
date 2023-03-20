import {
  Text,
  Link,
} from '@vkontakte/vkui';
import State from '../store/State';
import { ratings } from '../types/enums';
import { observer } from 'mobx-react-lite';
import '../css/rating.css';

export const RatingInfoBlock = observer(() => {

  return (
      <div className='rating-info-block'>
        <Text weight='2'>
          {State.getRatingCategory() === ratings.TOP_ALL
            ?
            'ТОП за всё время формируется на основе активных действий участников. Делитесь с друзьями, пишите комментарии или загружайте новые мемы, чтобы подняться в рейтинге.'
            : 
            <>
            ТОП недели формируется на основе активных действий участников. Каждый понедельник победитель будет опубликован в
            <Link href={'https://vk.com/public'+process.env.REACT_APP_GROUP} target="_blank"> официальной группе</Link>
            .
            </>
          }
        </Text>
      </div>
  );
})