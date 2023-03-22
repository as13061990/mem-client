import { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FixedLayout
} from '@vkontakte/vkui';
import Nickname from '../components/Nickname';
import State from '../store/State';
import { routes } from '../types/enums';
import Tabbar from '../components/Tabbar';
import Subscribe from '../components/Subscribe';
import Upload from '../components/Upload';
import Session from '../store/Session';
import { useRouter } from "@happysanta/router";

export const Profile = ({ id }: IpanelProps) => {
	const router = useRouter()
	useEffect(() => {
		Session.clearMemesNotif()
	}, []);

	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader
					before={<PanelHeaderBack onClick={() => {State.setRoute(routes.HOME); router.popPage()}} />}
				>Профиль</PanelHeader>
			</FixedLayout>
			<Upload />
			<Subscribe />
			<Nickname />
			<Tabbar />
		</Panel>
	);
}