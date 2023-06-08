import { useEffect } from 'react';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	FixedLayout
} from '@vkontakte/vkui';
import Nickname from '../components/MyProfile/Nickname';
import Tabbar from '../components/UI/Tabbar';
import Subscribe from '../components/MyProfile/Subscribe';
import Upload from '../components/MyProfile/Upload';
import Session from '../store/Session';
import { observer } from 'mobx-react-lite';
import State from '../store/State';
import bridge from '@vkontakte/vk-bridge';
import guideFirst from '../images/guideFirst';
import guideSecond from '../images/guideSecond';
import User from '../store/User';

export const MyProfile = observer(({ id }: IpanelProps) => {
	useEffect(() => {
		Session.clearMemesNotif()
		State.setRewardedButton(true)
		if (!User.getMember()) {
			User.setMember(true)
			//@ts-ignore
			bridge.send('VKWebAppShowSlidesSheet', {
				slides: [
					{
						media: {
							blob: `data:image/png;base64, ${guideFirst}`,
							type: 'image'
						},
						title: 'Профиль',
						subtitle: 'Каждый день тебе доступно три бесплатных жетона на загрузку мемов'
					}, {
						media: {
							blob: `data:image/png;base64, ${guideSecond}`,
							type: 'image'
						},
						title: 'Загрузка мема',
						subtitle: 'Откройте галерею и выберете свой мем. Картинка должна быть размером не более 2mb, jpg или png формата'
					}
				]
			})
		}
	}, []);

	return (
		<Panel id={id}>
			<FixedLayout vertical='top'>
				<PanelHeader
					before={<PanelHeaderBack onClick={() => window.history.back()} />}
				>Профиль</PanelHeader>
			</FixedLayout>
			{State.getPlatform() === 'mobile_iphone' ? <div style={{ width: '100%', height: '42px' }}></div> : null}
			<div style={{ width: '100%', height: '40px' }}></div>
			<Upload />
			<Subscribe />
			<Nickname />
			<div style={{ width: '100%', height: '30px' }}></div>
			<Tabbar />
		</Panel>
	);
})