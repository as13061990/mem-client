import { Div } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import State from "../../store/State";
import { Comment } from "../Comments/Comment";



const comments = [{
  avatar: "https://sun1-87.userapi.com/s/v1/ig2/-nyTmGSQjur6zwI_8ZnismjCg3ordIxmvUE2XEGatzeM3JzsuS8PfgBVNa7zoEi4Ea4EyMaVllf4WKNwS7beB3lm.jpg?size=100x100&quality=95&crop=125,0,414,414&ava=1",
  id: 49,
  message: "в",
  name: "Timko",
  strikes: { spam: 0, violence: 0, scam: 0, forbidden: 0, porno: 0 },
  time: "30:03:2023 14:58",
  user_id: 276669821
}, {
  avatar:"https://sun1-87.userapi.com/s/v1/ig2/-nyTmGSQjur6zwI_8ZnismjCg3ordIxmvUE2XEGatzeM3JzsuS8PfgBVNa7zoEi4Ea4EyMaVllf4WKNwS7beB3lm.jpg?size=100x100&quality=95&crop=125,0,414,414&ava=1",
  id:51,
  message:"asd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd as",
  name:"Timko",
  strikes:{ spam: 0, violence: 0, scam: 0, forbidden: 0, porno: 0 },
  time:"30:03:2023 16:59",
  user_id:276669821
},{
  avatar: "https://sun1-87.userapi.com/s/v1/ig2/-nyTmGSQjur6zwI_8ZnismjCg3ordIxmvUE2XEGatzeM3JzsuS8PfgBVNa7zoEi4Ea4EyMaVllf4WKNwS7beB3lm.jpg?size=100x100&quality=95&crop=125,0,414,414&ava=1",
  id: 49,
  message: "в",
  name: "Timko",
  strikes: { spam: 0, violence: 0, scam: 0, forbidden: 0, porno: 0 },
  time: "30:03:2023 14:58",
  user_id: 276669821
}, {
  avatar:"https://sun1-87.userapi.com/s/v1/ig2/-nyTmGSQjur6zwI_8ZnismjCg3ordIxmvUE2XEGatzeM3JzsuS8PfgBVNa7zoEi4Ea4EyMaVllf4WKNwS7beB3lm.jpg?size=100x100&quality=95&crop=125,0,414,414&ava=1",
  id:51,
  message:"asd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd as",
  name:"Timko",
  strikes:{ spam: 0, violence: 0, scam: 0, forbidden: 0, porno: 0 },
  time:"30:03:2023 16:59",
  user_id:276669821
},{
  avatar: "https://sun1-87.userapi.com/s/v1/ig2/-nyTmGSQjur6zwI_8ZnismjCg3ordIxmvUE2XEGatzeM3JzsuS8PfgBVNa7zoEi4Ea4EyMaVllf4WKNwS7beB3lm.jpg?size=100x100&quality=95&crop=125,0,414,414&ava=1",
  id: 49,
  message: "в",
  name: "Timko",
  strikes: { spam: 0, violence: 0, scam: 0, forbidden: 0, porno: 0 },
  time: "30:03:2023 14:58",
  user_id: 276669821
}, {
  avatar:"https://sun1-87.userapi.com/s/v1/ig2/-nyTmGSQjur6zwI_8ZnismjCg3ordIxmvUE2XEGatzeM3JzsuS8PfgBVNa7zoEi4Ea4EyMaVllf4WKNwS7beB3lm.jpg?size=100x100&quality=95&crop=125,0,414,414&ava=1",
  id:51,
  message:"asd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd as",
  name:"Timko",
  strikes:{ spam: 0, violence: 0, scam: 0, forbidden: 0, porno: 0 },
  time:"30:03:2023 16:59",
  user_id:276669821
},{
  avatar: "https://sun1-87.userapi.com/s/v1/ig2/-nyTmGSQjur6zwI_8ZnismjCg3ordIxmvUE2XEGatzeM3JzsuS8PfgBVNa7zoEi4Ea4EyMaVllf4WKNwS7beB3lm.jpg?size=100x100&quality=95&crop=125,0,414,414&ava=1",
  id: 49,
  message: "в",
  name: "Timko",
  strikes: { spam: 0, violence: 0, scam: 0, forbidden: 0, porno: 0 },
  time: "30:03:2023 14:58",
  user_id: 276669821
}, {
  avatar:"https://sun1-87.userapi.com/s/v1/ig2/-nyTmGSQjur6zwI_8ZnismjCg3ordIxmvUE2XEGatzeM3JzsuS8PfgBVNa7zoEi4Ea4EyMaVllf4WKNwS7beB3lm.jpg?size=100x100&quality=95&crop=125,0,414,414&ava=1",
  id:51,
  message:"asd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd asasd asd as",
  name:"Timko",
  strikes:{ spam: 0, violence: 0, scam: 0, forbidden: 0, porno: 0 },
  time:"30:03:2023 16:59",
  user_id:276669821
}]

export const ReportComments = observer(() => {

  return (
    <Div>
      {comments.map((comment: Icomment, i: number) => {
        return (
          <Comment
            key={i}
            data={comment}
          />
        )
      })}
    </Div>
  )
});
