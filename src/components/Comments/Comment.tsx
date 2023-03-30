import { Icon28MoreHorizontal } from "@vkontakte/icons";
import { Avatar, Div, Link, Separator, Spacing, Subhead, Text } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite";
import { useRef, useState, useCallback } from "react";
import Actions from "../../store/Actions";
import State from "../../store/State";
import { routes } from "../../types/enums";
import { More } from "../UI/More";

import ReportInfo, { ReportInfoType } from "../UI/ReportInfo";

export const Comment = observer(({ data }: { data: Icomment }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const textLength = data.message.length

  const toggleText = () => {
    setIsExpanded(prev => !prev);
  };

  const onProfileClick = useCallback(()=>{
    State.goToPage(routes.USERPROFILE); 
    Actions.getDataUserProfile(data.user_id);
  }, [data.user_id])

  const refMore: React.MutableRefObject<HTMLDivElement> = useRef();

  return (<>

    <Div>
      <div className="comments-block-comment">
        <Avatar src={data.avatar} style={{ cursor: 'pointer' }} onClick={onProfileClick} />
        <div className="comments-block-comment-info-wrapper" >

          <div className="comments-block-comment-info">
            <Text weight='2' style={{ display: 'flex', cursor: 'pointer' }} onClick={onProfileClick}>
              {data.name}
            </Text>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Subhead
                className="comments-block-comment-info-time"
                weight='3'
              >
                {data.time}
              </Subhead>
              <Icon28MoreHorizontal
                style={{ flexBasis: '1%', cursor: 'pointer', marginTop: '-5px' }}
                getRootRef={refMore}
                onClick={() => State.setPopout(<More refMore={refMore} data={data}/>)}
              />
            </div>
          </div>
          <ReportInfo reports={data.strikes} type={ReportInfoType.comment}/>
          <Text weight='3' className="comments-block-comment-info-text">
            {textLength > 120 ?
              isExpanded ? data.message : `${data.message.slice(0, 120)}...`
              : data.message}
            {textLength > 120 && !isExpanded ?
              <Link onClick={toggleText}>
                Читать
              </Link> : null
            }
          </Text>

        </div>
      </div>
    </Div>
    <Spacing size={10} />
    <Separator />
  </>
  )
});