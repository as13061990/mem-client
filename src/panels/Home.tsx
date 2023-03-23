import {
	Panel,
	PanelHeader,
	FixedLayout
} from '@vkontakte/vkui';
import Tabbar from '../components/Tabbar';
import Memes from '../components/Memes';
import CategoriesMenu from '../components/CategoriesMenu';

export const Home = ({id}: IpanelProps): JSX.Element => {
	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader>v1.0.35 Категории мемов</PanelHeader>
				<CategoriesMenu />
			</FixedLayout>
			<div style={{width: '100%', height: 40}}></div>
			<Memes />
			<Tabbar/>
		</Panel>
	);
};