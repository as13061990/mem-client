import {
	Panel,
	PanelHeader,
	FixedLayout
} from '@vkontakte/vkui';
import Tabbar from '../components/Tabbar';
import { memes } from '../types/enums';
import Memes from '../components/Memes';
import State from '../store/State';

export default ({id}: IpanelProps): JSX.Element => {
	State.setMemesType(memes.TIME);

	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader>Категории мемов</PanelHeader>
			</FixedLayout>

			<Memes />

			<Tabbar />
		</Panel>
	)
}