import {
  Cell,
  Avatar,
  Text,
  Separator,
} from '@vkontakte/vkui';
import '../../css/rating.css';
import { observer } from 'mobx-react-lite';

type IRatingListItem = Omit<IratingUser, 'id'>

export const RatingListItem = observer(({ avatar, name, points, place, self }: IRatingListItem): JSX.Element => {
  return (
    <>
      <Cell
        before={
          <>
            <Text weight='1' style={{ width: '35px' }}>
              {place}.
            </Text>
            <Avatar src={avatar} />
          </>
        }
        after={<Text weight='1'>{points}</Text>}
      >
        <Text weight={self ? '1' : '3'}>
          {name}
        </Text>
      </Cell>
      <Separator/>
    </>
  )

})