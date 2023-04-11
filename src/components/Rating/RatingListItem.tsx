import {
  Cell,
  Avatar,
  Text,
  Separator,
  Div,
} from '@vkontakte/vkui';
import '../../css/rating.css';
import { observer } from 'mobx-react-lite';
import State from '../../store/State';
import { routes } from '../../types/enums';
import Actions from '../../store/Actions';
import { useCallback } from "react";

export const RatingListItem = observer(({ avatar, name, points, place, self, id }: IratingUser): JSX.Element => {
  const weight = self ? '1' : '3'

  const onProfileClick = useCallback(() => {
    State.goToPage(routes.USERPROFILE);
    Actions.getDataUserProfile(id);
  }, [id])

  return (
    <>
      <Cell
        before={
          <Div style={{display: 'flex', alignItems: 'center', gap: '10px', flexBasis: '10%'}}>
            <Text weight={weight} style={{width: '25px'}}>
              {place}.
            </Text>
            <Avatar src={avatar} />
          </Div>
        }
        onClick={onProfileClick}
        after={<Text style={{marginLeft: '20px'}} weight={weight}>{points}</Text>}
      >
        <Text weight={weight} style={{ display: 'inline-block', maxWidth: '100%', whiteSpace: 'nowrap', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {name}
        </Text>
      </Cell>
      <Separator />
    </>
  )

})