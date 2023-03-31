import { Div } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite";
import Actions from "../../store/Actions";
import { ReportUser } from "./ReportUser";
import { useEffect } from 'react'
import State from "../../store/State";

export const ReportUsers = observer(() => {

  return (<>
    <Div>
      {State.getUsersStrikes()?.map((user: IuserStrikes) => {
        return (
          <ReportUser
            key={user.id}
            data={user}
          />
        )
      })}
    </Div>
  </>
  )
});