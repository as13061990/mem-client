import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import State from '../store/State';
import { routes } from '../types/enums';

const Persik = ({ id }: any) => {
	console.log('Persik');
	
	return (
		<Panel id={id}>
			<PanelHeader
				before={<PanelHeaderBack onClick={() => State.setRoute(routes.HOME)} />}
			>
				Persik
			</PanelHeader>
		</Panel>
	);
}

export default Persik;