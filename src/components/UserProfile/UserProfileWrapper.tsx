import { Div, Spinner } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import State from "../../store/State";
import UserHeader from "./UserHeader";
import UserInfo from "./UserInfo";

const color = 'rgb(52,163,255)'

export const UserProfileWrapper = observer(() => {

  return (
    <Div>
      {State.getLoading() ?
        <Spinner size="large" />
        :
        <>
          <UserHeader color={color} />
          <UserInfo color={color} />
        </>}
    </Div>
  )
});

export default UserProfileWrapper
