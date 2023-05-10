import { Alert, Button, Text } from "@vkontakte/vkui";
import State from "../../store/State";
import { popouts } from "../../types/enums";

const warningAlert = (): JSX.Element => {
  return (<Alert
    actions={[
      {
        title: 'Отмена',
        autoclose: true,
        mode: 'cancel',
      },
      {
        title: 'Опубликовать',
        autoclose: true,
        mode: 'destructive',
        action: () => console.log('publish'),
      },
    ]}
    actionsLayout="horizontal"
    onClose={() => { State.setPopout(null) }}
    header="Публикация рейтинга"
    text="Вы уверены, что хотите обнулить недельный рейтинг и опубликовать его?"
  />

  )
}


export const PublishRating = () => {

  const onClick = (): void => {
    State.setPopout(warningAlert(), popouts.ALERT)
  }

  return (
    <>
      <Text weight="1"  style={{ textAlign: 'center', marginTop: '50px' }}>Публикация недельного рейтинга</Text>
      <Button
        onClick={onClick}
        align="center"
        size="l"
        style={{ width: '50%', margin: '20px auto 0 auto' }}
      >
        Опубликовать
      </Button>
    </>
  )
};

export default PublishRating
