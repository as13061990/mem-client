import { Alert, Button, Text } from "@vkontakte/vkui";
import State from "../../store/State";
import { popouts } from "../../types/enums";
import Actions from "../../store/Actions";
import bridge from '@vkontakte/vk-bridge';

const prepareRating = async () => {
  const response = await Actions.sendRequest('prepareWinner', {})

  await bridge.send('VKWebAppCallAPIMethod', {
    method: 'wall.post', params: {
      owner_id: -Number(process.env.REACT_APP_GROUP),
      v: '5.131',
      from_group: 1,
      attachments: response.data.attachments,
      close_comments: 0,
      access_token: response.data.access_token,
    }
  }).then(res => {
    if (res?.response?.post_id) {
      Actions.sendRequest('sendWinner', {url: response.data.url})
    }
  });
}

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
        action: prepareRating,
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
      <Text weight="1" style={{ textAlign: 'center', marginTop: '50px' }}>Публикация недельного рейтинга</Text>
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
