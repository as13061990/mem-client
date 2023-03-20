import {
  Cell,
  Avatar,
  Text,
  Separator,
} from '@vkontakte/vkui';
import '../css/rating.css';
import { observer } from 'mobx-react-lite';
import { UserInfo } from '@vkontakte/vk-bridge';

interface IRatingListItem {
  number: number;
  user: UserInfo;
  isMe?: boolean;
}

export const RatingListItem = observer(({ number, user, isMe }: IRatingListItem): JSX.Element => {
  return (
    <>
      {isMe ? <Cell
        before={
          <>
            <Text weight='1' style={{ width: '35px' }}>
              {number}.
            </Text>
            <Avatar src={user.photo_100} />
          </>
        }
        after={<Text weight='1'>1000</Text>}
      >
        <Text weight='1'>
          {`${user.first_name} ${user.last_name}`}
        </Text>
      </Cell> 
      : 
      <Cell
        before={
          <>
            <Text style={{ width: '35px' }}>
              {number}.
            </Text>
            <Avatar src={user.photo_100} />
          </>
        }
        after={<>1000</>}
      >
        {`${user.first_name} ${user.last_name}`}
      </Cell>}
      <Separator />
    </>
  )

})