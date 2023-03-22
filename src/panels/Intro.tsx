import { Panel, Button } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import '../css/intro.css';
import State from '../store/State';
import { pages, routes } from '../types/enums';
import { useRouter } from "@happysanta/router";

export default ({id}: IpanelProps) => {
	const router = useRouter()

	return (
		<Panel id={id}>
			<div className='intro'>
				<div className='intro-header'>Добро пожаловать<br />на <b>фабрику мемов!</b></div>
				<div className='intro-logo' />
				<div className='intro-descr'>Здесь можно кекнуть с чужих мемасов,<br />либо залить свой.</div>
				<div className='intro-notif'>Обязательно подпишись на уведомления,<br />чтобы не пропустить самое интересное.</div>
				<div className='intro-button'>
					<Button size='m' onClick={() => {
						bridge.send('VKWebAppAllowNotifications', {}).then(res => {
							if (res.result) {
								State.setRoute(routes.HOME);
								router.pushPage(pages.HOME)
							}
						});
					}}>Огонь, я в деле!</Button>
				</div>
				<div className='intro-continue' onClick={() => State.setRoute(routes.HOME)}>Продолжить</div>
			</div>
		</Panel>
	);
}