import {
	Panel,
	PanelHeader,
	PanelHeaderBack
} from '@vkontakte/vkui';
import State from '../store/State';
import { routes } from '../types/enums';
import Footer from '../components/Footer';

const Admin = ({ id }: IpanelProps) => {
	console.log('Admin');
	
	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
			>
				Модерация
			</PanelHeader>
			<Footer />
		</Panel>
	);
}

export default Admin;