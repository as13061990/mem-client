import { useEffect } from 'react';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FixedLayout
} from '@vkontakte/vkui';
import Nickname from '../components/MyProfile/Nickname';
import Tabbar from '../components/UI/Tabbar';
import Subscribe from '../components/MyProfile/Subscribe';
import Upload from '../components/MyProfile/Upload';
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
			<div style={{ width: '100%', height: '30px' }}></div>
			<Tabbar />
		</Panel>
	);
})