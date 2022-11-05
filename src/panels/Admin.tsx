import {
	Panel,
	PanelHeader,
	PanelHeaderBack
} from '@vkontakte/vkui';
import State from '../store/State';
import { routes } from '../types/enums';
import Tabbar from '../components/Tabbar';

const Admin = ({ id }: IpanelProps) => {
	console.log('Admin');
	
	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
			>Модерация</PanelHeader>
			<Tabbar />
		</Panel>
	);
}

export default Admin;