import {
	Panel,
	PanelHeader,
  PanelHeaderBack,
} from '@vkontakte/vkui';
import Nickname from '../components/Nickname';
import State from '../store/State';
import { routes } from '../types/enums';
import Footer from '../components/Footer';

const Profile = ({ id }: IpanelProps) => {
	console.log('Profile');
	
	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
			>
				Профиль
			</PanelHeader>
			<Nickname />
			<Footer />
		</Panel>
	);
}

export default Profile;