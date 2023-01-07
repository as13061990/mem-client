import {
	Panel,
	PanelHeader,
	FixedLayout
} from '@vkontakte/vkui';
import Tabbar from '../components/Tabbar';

export default ({id}: IpanelProps): JSX.Element => {

	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader>Категории мемов</PanelHeader>
			</FixedLayout>
			<Tabbar />
		</Panel>
	)
}