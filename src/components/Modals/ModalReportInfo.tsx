import { Button, ModalCard, Spacing, Text } from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import State from '../../store/State';

export const ModalReportInfo = observer(({ id }: ImodalProps) => {
  const onClose = () => {
    State.setActiveModal(null)
    State.setReportInfo(null)
  }

  return (
    <ModalCard
      id={id}
      onClose={() => onClose()}
      header="Жалобы"
      actions={
        <Button
          size="l"
          mode="primary"
          stretched
          onClick={() => onClose()}
        >
          Понятно
        </Button>
      }
    >
      <Text weight='3' style={{ textAlign: 'center' }}>
        <Spacing size={20} />
        Спам - {State.getReportInfo()?.spam || 0}
        <Spacing size={3} />
        Насилие и вражда - {State.getReportInfo()?.violence || 0}
        <Spacing size={3} />
        Обман - {State.getReportInfo()?.scam || 0}
        <Spacing size={3} />
        Запрещенные товары - {State.getReportInfo()?.forbidden || 0}
        <Spacing size={3} />
        Порнография - {State.getReportInfo()?.porno || 0}
        <Spacing size={15} />
      </Text>
    </ModalCard>
  )
});

export default ModalReportInfo