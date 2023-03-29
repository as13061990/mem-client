import { Button, ModalCard, Spacing, Text } from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import State from '../../store/State';

export const ModalRules = observer(({ id }: ImodalProps) => {

  return (
    <ModalCard
      id={id}
      onClose={() => State.setActiveModal(null)}
      header="Правила"
      subheader={'Баллы начисляются за разные действия'}
      actions={
        <Button
          size="l"
          mode="primary"
          stretched
          onClick={() => State.setActiveModal(null)}
        >
          Понятно
        </Button>
      }
    >
      <Text weight='3' style={{ textAlign: 'center' }}>
        <Spacing size={20} />
        Лайк - 1
        <Spacing size={3} />
        Коммент - 3
        <Spacing size={3} />
        Поделиться - 5
        <Spacing size={3} />
        Загрузить мем - 10
        <Spacing size={15} />
      </Text>
    </ModalCard>
  )
});

export default ModalRules