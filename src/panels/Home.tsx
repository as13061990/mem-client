import {
	Panel,
	PanelHeader
} from '@vkontakte/vkui';

const Home = ({ id }: IpanelProps): JSX.Element => {
	console.log('Home');

	return (
		<Panel id={id}>
			<PanelHeader>Категории мемов</PanelHeader>

		</Panel>
	)
}

export default Home;