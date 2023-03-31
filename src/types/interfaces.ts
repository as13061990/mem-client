interface IpanelProps {
  id: string;
}
interface IrequestRespons {
  error: boolean;
  error_type: number;
  data: any;
}

interface Istrikes {
  spam: number,
  violence: number,
  scam: number,
  forbidden: number,
  porno: number
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
  strikes: Istrikes // жалобы
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
  id: number // id комментария
  user_id: number // id автора комментария
  strikes: Istrikes // жалобы
  avatar: string; // аватар пользователя
  message: string; // текст комментария
  name: string; // имя автора комментария
  time: string; // время отправки комментария
}

interface IcommentSend {
  meme: number,
  message: string
}

interface ImodalProps {
  id: string;
}

interface IuserProfile {
  id: number // айди
  ban: boolean // бан на комментарии
  avatar: string // ссылка на аватар
  comments: number // кол-во комментов
  likes: number // кол-во лайков
  memes: number // кол-во загруженных мемов
  name: string // имя
  share: number // кол-во репостов
  top_all: number // топ всего
  top_week: number // топ недели
}
