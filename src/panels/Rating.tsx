import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FixedLayout
} from '@vkontakte/vkui';
import State from '../store/State';
import { routes } from '../types/enums';
import Tabbar from '../components/Tabbar';

export default ({id}: IpanelProps) => {
	
	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader
					before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
				>Рейтинг</PanelHeader>
			</FixedLayout>
			<Tabbar />
		</Panel>
	);
}