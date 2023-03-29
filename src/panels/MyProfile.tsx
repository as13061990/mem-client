import { useEffect } from 'react';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FixedLayout
} from '@vkontakte/vkui';
import Nickname from '../components/Nickname';
import Tabbar from '../components/Tabbar';
import Subscribe from '../components/Subscribe';
import Upload from '../components/Upload';
import Session from '../store/Session';
import { observer } from 'mobx-react-lite';
import State from '../store/State';

export const MyProfile = observer(({ id }: IpanelProps) => {
	useEffect(() => {
		Session.clearMemesNotif()
	}, []);

	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader
					before={<PanelHeaderBack onClick={() => window.history.back()} />}
				>Профиль</PanelHeader>
			</FixedLayout>
			{State.getPlatform() === 'mobile_iphone' ? <div style={{ width: '100%', height: '42px' }}></div> : null}
			<div style={{width: '100%', height: '40px'}}></div>
			<Upload />
			<Subscribe />
			<Nickname />
			<Tabbar />
		</Panel>
	);
})