import {
	Panel,
	PanelHeader,
  PanelHeaderBack,
	Group,
	Avatar,
	RichCell,
	Button
} from '@vkontakte/vkui';
import State from '../store/State';
import User from '../store/User';
import { routes } from '../types/enums';

const Profile = ({ id }: IpanelProps) => {
	console.log('Profile');
	const user = User.getUser();
	
	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
			>
				Профиль
			</PanelHeader>
			<Group>
        <RichCell
          disabled
          before={<Avatar size={72} src={user.photo_200} />}
          actions={<Button>Сменить никнейм</Button>}
        >
          {User.getUseNickname() ? User.getNickname() : user.first_name}
        </RichCell>
      </Group>
		</Panel>
	);
}

export default Profile;