import {
  List,
} from '@vkontakte/vkui';
import '../css/rating.css';
import User from '../store/User';
import State from '../store/State';
import { ratings } from '../types/enums';
import { observer } from 'mobx-react-lite';
import { RatingListItem } from './RatingListItem';


export const RatingList = observer(() => {
  const arr = State.getRatingCategory() === ratings.TOP_WEEK ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  return (
    <List>
      {arr.map((item) => {
        if (item === 11) {
          return (<RatingListItem key={item} user={User.getUser()} number={item} isMe={true} />)
        } else {
          return (<RatingListItem key={item} user={User.getUser()} number={item} />)
        }
      })}
    </List>

  );
})