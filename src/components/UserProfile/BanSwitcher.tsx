import { Div, SimpleCell, Switch } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import { useState } from 'react'
import Actions from "../../store/Actions";
import State from "../../store/State";

export const BanSwitcher = observer(() => {
  const [value, setValue] = useState(false)
  const onClick = () => {
    setValue(prev => !prev)
    Actions.banUser(State.getUserProfile(), value)
  }

  return (<>
    {State.isAdmin() ?
      <Div style={{ display: 'flex', justifyContent: 'center' }}>
        <SimpleCell
          Component="label"
          after={<Switch onClick={onClick} defaultChecked={value} />} >
          Бан на комментарии
        </SimpleCell>
      </Div>
      : null}
  </>
  )
});
