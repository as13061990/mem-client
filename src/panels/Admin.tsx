import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FixedLayout
} from '@vkontakte/vkui';
import State from '../store/State';
import { routes } from '../types/enums';
import Tabbar from '../components/Tabbar';
import Memes from '../components/Memes';

export default ({id,goToPage}: IpanelProps) => {
	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader
					before={<PanelHeaderBack onClick={() => window.history.back()} />}
				>Модерация</PanelHeader>
			</FixedLayout>
			<Memes />
			<Tabbar goToPage={goToPage}/>
		</Panel>
	);
}