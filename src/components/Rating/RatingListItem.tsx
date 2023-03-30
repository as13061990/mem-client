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
import Actions from '../../store/Actions';
import { useCallback } from "react";

export const RatingListItem = observer(({ avatar, name, points, place, self, id }: IratingUser): JSX.Element => {
  const weight = self ? '1' : '3'
  
  const onProfileClick = useCallback(()=>{
    State.goToPage(routes.USERPROFILE); 
    Actions.getDataUserProfile(id);
  }, [id])

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
        onClick={onProfileClick}
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