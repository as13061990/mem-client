import { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
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

export const Profile = ({ id }: IpanelProps) => {
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
			<Upload />
			<Subscribe />
			<Nickname />
			<Tabbar />
		</Panel>
	);
}