import {
	Panel,
	PanelHeader,
	PanelHeaderBack
} from '@vkontakte/vkui';
import State from '../store/State';
import { routes } from '../types/enums';

const Admin = ({ id }: IpanelProps) => {
	console.log('Admin');
	
	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
			>
				Модерация
			</PanelHeader>
		</Panel>
	);
}

export default Admin;