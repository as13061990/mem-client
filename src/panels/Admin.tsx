import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FixedLayout
} from '@vkontakte/vkui';
import Tabbar from '../components/Tabbar';
import Memes from '../components/Memes';

export default ({id}: IpanelProps) => {
	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader
					before={<PanelHeaderBack onClick={() => window.history.back()} />}
				>Модерация</PanelHeader>
			</FixedLayout>
			<div className='header-space'/>
			<Memes />
			<Tabbar/>
		</Panel>
	);
}