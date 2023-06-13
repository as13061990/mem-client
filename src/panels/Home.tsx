import {
	Panel,
	PanelHeader,
	FixedLayout
} from '@vkontakte/vkui';
import Tabbar from '../components/UI/Tabbar';
import Memes from '../components/Memes/Memes';
import CategoriesMenu from '../components/Memes/CategoriesMenu';
import { observer } from 'mobx-react-lite';
import State from '../store/State';
import { useEffect } from "react";
import { memes } from '../types/enums';

export const Home = observer(({ id }: IpanelProps): JSX.Element => {
	
	useEffect(() => {
		if (State.getCategory() === memes.USER) {
			State.setCategory(memes.TIME)
		}
	}, [])

	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader>Категории мемов</PanelHeader>
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