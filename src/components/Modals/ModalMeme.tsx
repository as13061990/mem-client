import { ModalPage } from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import State from '../../store/State';

export const ModalMeme = observer(({ id }: ImodalProps) => {

  return (
    <ModalPage
      id={id}
      onClose={() => State.setActiveModal(null)}
    >
      <img src={State.getActiveMeme()} alt='meme' style={{marginBottom: '-4px', width: '100%', borderRadius: '10px', maxHeight: '85vh'}} />
    </ModalPage>
  )
});

export default ModalMeme