import {
	Panel,
	PanelHeader,
	PanelHeaderBack
} from '@vkontakte/vkui';
import State from '../store/State';
import { routes } from '../types/enums';
import Tabbar from '../components/Tabbar';

const Rating = ({ id }: IpanelProps) => {
	console.log('Rating');
	
	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
			>Рейтинг</PanelHeader>
			<Tabbar />
		</Panel>
	);
}

export default Rating;