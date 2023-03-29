import { Icon28CheckCircleOutline } from '@vkontakte/icons';
import { Button, FormItem, ModalCard, Radio, Snackbar, Spacing, Text } from '@vkontakte/vkui';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Actions from '../../store/Actions';
import State from '../../store/State';
import { reports } from '../../types/enums';

const reportsArr = [
  { label: 'Спам', value: reports.SPAM },
  { label: 'Насилие и вражда', value: reports.VIOLENCE },
  { label: 'Обман', value: reports.SCAM },
  { label: 'Запрещенные товары', value: reports.FORBIDDEN },
  { label: 'Порнография', value: reports.PORNO }
]

const reportSucces = () => {
  if (State.getSnackbar()) return;
  State.setSnackbar(
    <Snackbar
      duration={2000}
      onClose={() => State.setSnackbar(null)}
      before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
    >
      Жалоба успешно отправлена
    </Snackbar>,
  );
}

export const ModalReport = observer(({ id }: ImodalProps) => {

  const [value, setValue] = useState(null)
  const onChange = (value) => {
    setValue(value)
  }

  const closeModal = (success?: boolean) => {
    if (State.getReportMeme()) {
      State.setActiveModal(null);
      State.setReportMeme(null);
      if (success) {
        Actions.reportMeme(State.getReportMeme());
        reportSucces();
      }
    } else {
      State.setActiveModal(null);
      State.setReportComment(null);
      if (success) {
        Actions.reportComment(State.getReportComment());
        reportSucces();
      }
    }
  }

  return (
    <ModalCard
      id={id}
      onClose={() => closeModal()}
      header="Пожаловаться"
      actions={
        <>
          <Button
            size="l"
            mode="secondary"
            stretched
            onClick={() => closeModal()}
          >
            Отмена
          </Button>
          <Button
            size="l"
            mode="primary"
            stretched
            disabled={value === null}
            onClick={() => closeModal(true)}
          >
            Отправить
          </Button>
        </>
      }
    >
      <Spacing size={30} />
      <Text weight='1' style={{ textAlign: 'center' }}>
        Что именно вам кажется недопустимым в этом материале?
      </Text>
      <Spacing size={30} />
      <FormItem>
        {reportsArr.map((report) => {
          return (
            <Radio key={report.value} name='radio' value={report.value} onClick={() => onChange(report.value)}>
              {report.label}
            </Radio>
          )
        })}
      </FormItem>
    </ModalCard>
  )
});

export default ModalReport