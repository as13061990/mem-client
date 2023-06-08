import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FixedLayout
} from '@vkontakte/vkui';
import Tabbar from '../components/UI/Tabbar';
import { observer } from 'mobx-react-lite';
import State from '../store/State';
import AdminWrapper from '../components/Admin/AdminWrapper';
import { CategoriesAdmin } from '../components/Admin/CategoriesAdmin';

export default observer(({ id }: IpanelProps) => {
	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader
					before={<PanelHeaderBack onClick={() => window.history.back()} />}
				>v0.0.34 Модерация</PanelHeader>
				<CategoriesAdmin />
			</FixedLayout>
			{State.getPlatform() === 'mobile_iphone' ? <div style={{ width: '100%', height: '62px' }}></div> : null}
			<div style={{ width: '100%', height: '100px' }}></div>
			<AdminWrapper />
			<Tabbar />
		</Panel>
	);
})