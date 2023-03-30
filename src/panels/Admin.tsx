import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FixedLayout
} from '@vkontakte/vkui';
import Tabbar from '../components/UI/Tabbar';
import Memes from '../components/Memes/Memes';
import { observer } from 'mobx-react-lite';
import State from '../store/State';

export default observer(({id}: IpanelProps) => {
	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader
					before={<PanelHeaderBack onClick={() => window.history.back()} />}
				>Модерация</PanelHeader>
			</FixedLayout>
			{State.getPlatform() === 'mobile_iphone' ? <div style={{ width: '100%', height: '42px' }}></div> : null}
			<div style={{width: '100%', height: '60px'}}></div>
			<Memes />
			<Tabbar/>
		</Panel>
	);
})