import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import State from '../store/State';
import User from '../store/User';
import { routes } from '../types/enums';

const Home = ({ id }: any): JSX.Element => {
	console.log('Home');

	const user = User.getUser();
	return (
		<Panel id={id}>
			<PanelHeader>Example</PanelHeader>
			{user &&
			<Group>
				<Cell
					before={user.photo_200 ? <Avatar src={user.photo_200}/> : null}
					description={user.city && user.city.title ? user.city.title : ''}
				>
					{`${user.first_name} ${user.last_name}`}
				</Cell>
			</Group>}

			<Group header={<Header mode="secondary">Navigation Example</Header>}>
				<Div>
					<Button stretched size="l" mode="secondary" onClick={() => State.setRoute(routes.PERSIK)}>
						Show me the Persik, please
					</Button>
				</Div>
			</Group>
		</Panel>
	)
}

export default Home;