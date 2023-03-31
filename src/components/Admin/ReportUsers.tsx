import { Div } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite";
import { ReportUser } from "./ReportUser";


export const ReportUsers = observer(() => {

  return (<>
    <Div>
      <ReportUser/>
      <ReportUser/>
      <ReportUser/>
      <ReportUser/>
      <ReportUser/>
      <ReportUser/>
      <ReportUser/>
    </Div>
  </>
  )
});