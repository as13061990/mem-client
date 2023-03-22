interface IpanelProps {
  id: string;
}
interface IrequestRespons {
  error: boolean;
  error_type: number;
  data: any;
}
interface Imeme {
  id: number; // id мема
  url: string; // локально-серверный урл картинки
  likes: number; // количество "лайков"
  comments: number; // количество комментариев
  share: number; // количество "поделиться"
  time: number; // время публикации/загрузки
  vk_url: string; // ссылка на картинку с ВК сервера
  opinion: boolean; // лайк юзера
  status: number; // статус
  user_id: number; // id опубликовавшего пользователя
  attachments: string; // аттачмент для стены
  avatar: string; // аватар пользователя
  name: string; // имя пользователя 
}

interface IratingUser {
  avatar: string; // аватар пользователя
  id: number; // айди пользоваля
  name: string; // имя или никнейм пользователя
  place: number; // место пользователя в рейтинге
  points: number; // количество очков пользователя в рейтинге
  self: boolean; // это я?
}

interface IratingUsers {
  all: IratingUser[]; // весь рейтинг
  week: IratingUser[];  // недельный рейтинг
}

interface Icomment {
  avatar: string; // аватар пользователя
  message: string; // текст комментария
  name:string; // имя автора комментария
  time: string; // время отправки комментария
}

interface IcommentSend {
  meme: number,
  message: string
}