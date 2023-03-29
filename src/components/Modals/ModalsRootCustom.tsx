import { ModalRoot } from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import State from '../../store/State';
import { modals } from '../../types/enums';
import ModalReport from './ModalReport';
import ModalRules from './ModalRules';

export const ModalsRootCustom = observer(() => {

  return (
    <ModalRoot activeModal={State.getActiveModal()} onClose={()=>{State.setActiveModal(null); State.setReportMeme(null); State.setReportComment(null)}}>
      <ModalRules id={modals.RULES} />
      <ModalReport id={modals.REPORT} />
    </ModalRoot>
  )
});

export default ModalsRootCustom