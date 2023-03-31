import { Div, SimpleCell, Switch } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import Actions from "../../store/Actions";
import State from "../../store/State";

export const BanSwitcher = observer(() => {
  const value = State.getUserProfile()?.ban_comments

  const onClick = () => {
    Actions.banUser(State.getUserProfile(), !value)
  }

  return (<>
    {State.isAdmin() ?
      <Div style={{ display: 'flex', justifyContent: 'center' }}>
        <SimpleCell
          Component="label"
          after={<Switch onClick={onClick} defaultChecked={State.getUserProfile()?.ban_comments} />} >
          Бан на комментарии
        </SimpleCell>
      </Div>
      : null}
  </>
  )
});
