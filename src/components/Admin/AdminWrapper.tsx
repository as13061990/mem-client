import { Spinner } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite"
import State from "../../store/State";
import { admins } from "../../types/enums";
import Memes from "../Memes/Memes";
import { CategoriesAdmin } from "./CategoriesAdmin"
import { ReportComments } from "./ReportComments";
import { ReportUsers } from "./ReportUsers";

export const AdminWrapper = observer(() => {

  return (<>
    <CategoriesAdmin />

      {State.getLoading() ? <Spinner size='large' /> 
      : <>
      {State.getAdminCategory() === admins.MEMES ? <Memes/> : null}
      {State.getAdminCategory() === admins.USERS ? <ReportUsers/> : null}
      {State.getAdminCategory() === admins.COMMENTS ? <ReportComments/> : null}
      </>}


  </>)
});

export default AdminWrapper
