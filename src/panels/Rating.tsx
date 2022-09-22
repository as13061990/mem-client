import {
	Panel,
	PanelHeader,
	PanelHeaderBack
} from '@vkontakte/vkui';
import State from '../store/State';
import { routes } from '../types/enums';
import Footer from '../components/Footer';

const Rating = ({ id }: IpanelProps) => {
	console.log('Rating');
	
	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
			>
				Недельный рейтинг
			</PanelHeader>
			<Footer />
		</Panel>
	);
}

export default Rating;