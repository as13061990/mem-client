import { ModalRoot } from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import State from '../../store/State';
import { modals } from '../../types/enums';
import ModalReport from './ModalReport';
import ModalReportInfo from './ModalReportInfo';
import ModalRules from './ModalRules';

export const ModalsRootCustom = observer(() => {
  const closeModals = () => {
    State.setActiveModal(null);
    State.setReportMeme(null);
    State.setReportComment(null)
    State.setReportInfo(null)
  }
  return (
    <ModalRoot activeModal={State.getActiveModal()} onClose={() => closeModals()}>
      <ModalRules id={modals.RULES} />
      <ModalReport id={modals.REPORT} />
      <ModalReportInfo id={modals.REPORTINFO} />
    </ModalRoot >
  )
});

export default ModalsRootCustom
