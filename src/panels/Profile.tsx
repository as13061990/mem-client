import { useEffect } from 'react';
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

export default ({id}: IpanelProps) => {
	useEffect(() => {
		Session.clearMemesNotif()
  }, []);

	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader
					before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
				>Профиль</PanelHeader>
      </FixedLayout>
			<Upload />
			<Subscribe />
			<Nickname />
			<Tabbar />
		</Panel>
	);
}