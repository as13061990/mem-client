import {
	Panel,
	PanelHeader
} from '@vkontakte/vkui';
import Tabbar from '../components/Tabbar';

export default ({ id }: IpanelProps): JSX.Element => {

	return (
		<Panel id={id}>
			<PanelHeader>Категории мемов</PanelHeader>
			<Tabbar />
		</Panel>
	)
}