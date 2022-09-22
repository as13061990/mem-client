import {
	Panel,
	PanelHeader
} from '@vkontakte/vkui';
import Footer from '../components/Footer';

const Home = ({ id }: IpanelProps): JSX.Element => {
	console.log('Home');

	return (
		<Panel id={id}>
			<PanelHeader>Категории мемов</PanelHeader>
			<Footer />
		</Panel>
	)
}

export default Home;