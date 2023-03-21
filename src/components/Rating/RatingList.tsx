import {
  List,
} from '@vkontakte/vkui';
import '../../css/rating.css';
import State from '../../store/State';
import { ratings } from '../../types/enums';
import { observer } from 'mobx-react-lite';
import { RatingListItem } from './RatingListItem';



export const RatingList = observer(() => {
  const arr = State.getRatingCategory() === ratings.TOP_ALL ? State.getRatingUsers().all : State.getRatingUsers().week

  return (
    <List>
      {arr.map((user) => {
        return (
          <RatingListItem
            key={user.id}
            avatar={user.avatar}
            name={user.name}
            place={user.place}
            points={user.points}
            self={user.self}
          />)
      })}
    </List>

  );
})