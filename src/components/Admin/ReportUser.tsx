import { Avatar, Cell, Separator, Text } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import Actions from "../../store/Actions";
import State from "../../store/State";
import { routes } from "../../types/enums";

import ReportInfo, { ReportInfoType } from "../UI/ReportInfo";
const data = {
  avatar: "https://sun1-87.userapi.com/s/v1/ig2/-nyTmGSQjur6zwI_8ZnismjCg3ordIxmvUE2XEGatzeM3JzsuS8PfgBVNa7zoEi4Ea4EyMaVllf4WKNwS7beB3lm.jpg?size=100x100&quality=95&crop=125,0,414,414&ava=1",
  id: 49,
  message: "в",
  name: "Timko",
  strikes: { spam: 0, violence: 0, scam: 0, forbidden: 0, porno: 0 },
  time: "30:03:2023 14:58",
  user_id: 276669821
}

export const ReportUser = observer(() => {

  const onProfileClick = useCallback(() => {
    State.goToPage(routes.USERPROFILE);
    Actions.getDataUserProfile(data.user_id);
  }, [data.user_id])

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