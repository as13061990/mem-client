import {
	Panel,
	PanelHeader,
	FixedLayout
} from '@vkontakte/vkui';
import Tabbar from '../components/Tabbar';
import Memes from '../components/Memes';
import CategoriesMenu from '../components/CategoriesMenu';
import { observer } from 'mobx-react-lite';
import State from '../store/State';

export const Home = observer(({ id }: IpanelProps): JSX.Element => {
	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader>v1.1.28 Категории мемов</PanelHeader>
				<CategoriesMenu />
			</FixedLayout>
			<div className='header-space' />
			{State.getPlatform() === 'mobile_iphone' ? <div style={{ width: '100%', height: '62px' }}></div> : null}
			<div style={{ width: '100%', height: '100px' }}></div>
			<Memes />
			<Tabbar />
		</Panel>
	);
});