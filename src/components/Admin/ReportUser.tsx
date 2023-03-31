import { Avatar, Cell, Separator, Text } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import Actions from "../../store/Actions";
import State from "../../store/State";
import { routes } from "../../types/enums";

import ReportInfo, { ReportInfoType } from "../UI/ReportInfo";


export const ReportUser = observer(({data}:{data: IuserStrikes}) => {

  const onProfileClick = useCallback(() => {
    State.goToPage(routes.USERPROFILE);
    Actions.getDataUserProfile(data.id);
  }, [data.id])

  return (<>
      <Cell
        onClick={onProfileClick}
        before={<Avatar src={data.avatar} style={{ cursor: 'pointer' }} />}
        after={<ReportInfo reports={data.strikes} type={ReportInfoType.user} />}

      >
        <Text weight='2' style={{ display: 'flex', cursor: 'pointer' }} onClick={onProfileClick}>
          {data.name}
        </Text>
        
      </Cell>
      <Separator />
  </>
  )
});