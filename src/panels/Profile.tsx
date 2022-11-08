import {
	Panel,
	PanelHeader,
  PanelHeaderBack,
} from '@vkontakte/vkui';
import Nickname from '../components/Nickname';
import State from '../store/State';
import { routes } from '../types/enums';
import Tabbar from '../components/Tabbar';
import Subscribe from '../components/Subscribe';

export default ({ id }: IpanelProps) => {
	
	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
			>Профиль</PanelHeader>
			<Subscribe />

			<Nickname />
			<Tabbar />
		</Panel>
	);
}