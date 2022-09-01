import { Panel } from '@vkontakte/vkui';

const Intro = ({ id }: IpanelProps) => {
	console.log('Intro');
	
	return (
		<Panel id={id}>
      Это интро
		</Panel>
	);
}

export default Intro;