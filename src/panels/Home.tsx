import {
	Panel,
	PanelHeader,
	FixedLayout
} from '@vkontakte/vkui';
import Tabbar from '../components/Tabbar';
import Memes from '../components/Memes';
import CategoriesMenu from '../components/CategoriesMenu';

export const Home = ({ id }: IpanelProps): JSX.Element => {
	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader>v1.1.9 Категории мемов</PanelHeader>
				<CategoriesMenu />
			</FixedLayout>
			<div className='header-space' />
			<div style={{ width: '100%', height: '100px' }}></div>
			<Memes />
			<Tabbar />
		</Panel>
	);
};