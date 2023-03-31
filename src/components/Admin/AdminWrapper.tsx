import { Spinner } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite"
import State from "../../store/State";
import { admins } from "../../types/enums";
import Memes from "../Memes/Memes";
import { ReportComments } from "./ReportComments";
import { ReportUsers } from "./ReportUsers";
import { useEffect } from 'react'
import Actions from "../../store/Actions";

export const AdminWrapper = observer(() => {
  const category = State.getAdminCategory()
  useEffect(() => {
    if (category === admins.COMMENTS) {
      Actions.getCommentsStrikes()
    } else if (category === admins.USERS) {
      Actions.getUsersStrikes()
    }
  }, [category])
  return (<>
    {State.getLoading() ? <Spinner size='large' />
      : <>
        {State.getAdminCategory() === admins.MEMES ? <Memes /> : null}
        {State.getAdminCategory() === admins.USERS ? <ReportUsers /> : null}
        {State.getAdminCategory() === admins.COMMENTS ? <ReportComments /> : null}
      </>}
  </>)
});

export default AdminWrapper
