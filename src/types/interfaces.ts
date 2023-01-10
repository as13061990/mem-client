interface IpanelProps {
  id: string;
}
interface IrequestRespons {
  error: boolean;
  error_type: number;
  data: any;
}
interface Imeme {
  likes: number; // количество "лайков"
  attachments: string; // аттачмент для стены
  id: number; // id мема
  time: number; // время публикации/загрузки
  url: string; // локально-серверный урл картинки
  user_id: number; // id опубликовавшего пользователя
  vk_url: string; // ссылка на картинку с ВК сервера
  comments: number; // количество комментариев
  share: number; // количество "поделиться"
  opinion: boolean; // лайк юзера
  status: number; // статус
}