import {
  Cell,
  Avatar,
  Text,
  Separator,
} from '@vkontakte/vkui';
import '../../css/rating.css';
import { observer } from 'mobx-react-lite';
import State from '../../store/State';
import { routes } from '../../types/enums';

type IRatingListItem = Omit<IratingUser, 'id'>

export const RatingListItem = observer(({ avatar, name, points, place, self }: IRatingListItem): JSX.Element => {
  const weight = self ? '1' : '3'
  return (
    <>
      <Cell
        before={
          <>
            <Text weight={weight} style={{ width: '35px' }}>
              {place}.
            </Text>
            <Avatar src={avatar}/>
          </>
        }
        onClick={()=>{State.goToPage(routes.USERPROFILE)}}
        after={<Text weight={weight}>{points}</Text>}
      >
        <Text weight={weight}>
          {name}
        </Text>
      </Cell>
      <Separator/>
    </>
  )

})