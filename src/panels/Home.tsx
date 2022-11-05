import {
	Panel,
	PanelHeader
} from '@vkontakte/vkui';
import Tabbar from '../components/Tabbar';

const Home = ({ id }: IpanelProps): JSX.Element => {
	console.log('Home');

	return (
		<Panel id={id}>
			<PanelHeader>Категории мемов</PanelHeader>
			<Tabbar />
		</Panel>
	)
}

export default Home;