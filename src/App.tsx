import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import Loading from './panels/Loading';
import Home from './panels/Home';
import Persik from './panels/Persik';
import State from './store/State';
import { routes } from './types/enums';
import { Observer } from 'mobx-react-lite';
import Actions from './store/Actions';
import Intro from './panels/Intro';

const App = (): JSX.Element => {
	Actions.checkUser();

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<Observer render={() => (
						<SplitLayout popout={State.getSpinner()}>
							<SplitCol>
									<View activePanel={State.getRoute()} onTransition={() => { /* когда заканчивается  */ }}>
										<Loading id={routes.LOADING} />
										<Intro id={routes.INTRO} />
										<Home id={routes.HOME} />
										<Persik id={routes.PERSIK} />
									</View>
							</SplitCol>
						</SplitLayout>
					)} />
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;