import { Icon28MoreHorizontal } from "@vkontakte/icons";
import { Avatar, Div, Link, Separator, Spacing, Subhead, Text, usePlatform } from "@vkontakte/vkui"
import { observer } from "mobx-react-lite";
import { useRef, useState, useCallback } from "react";
import Actions from "../../store/Actions";
import State from "../../store/State";
import { routes } from "../../types/enums";
import { More } from "../UI/More";

import ReportInfo, { ReportInfoType } from "../UI/ReportInfo";

export const Comment = observer(({ data }: { data: Icomment }) => {

  const platform = usePlatform()
  const [isExpanded, setIsExpanded] = useState(false);

  const textLength = data.message.length

  const toggleText = () => {
    setIsExpanded(prev => !prev);
  };

  const onProfileClick = useCallback(() => {
    State.goToPage(routes.USERPROFILE);
    Actions.getDataUserProfile(data.user_id);
  }, [data.user_id])

  const refMore: React.MutableRefObject<HTMLDivElement> = useRef();

  return (<>

    <Div>
      <div className="comments-block-comment-info">
        <div style={{display: 'flex', width: '72%', gap: '18px', }}>
          <Avatar src={data.avatar} style={{ cursor: 'pointer', display: 'inline-block' }} onClick={onProfileClick} />
          <Text weight='2'
            style=
            {{
              display: 'inline-block',
              width: '82%',
            }}
          >
            <span style={{ maxWidth: '100%', whiteSpace: 'nowrap', cursor: 'pointer', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis' }} onClick={onProfileClick}>
              {data.name}
            </span>
          </Text>
        </div>


        <div style={{ display: 'flex', gap: '20px' }}>
          {platform === 'vkcom' ?
            <Subhead
              className="comments-block-comment-info-time"
              weight='3'
              style={{ textAlign: 'right', flexBasis: '100%' }}
            >
              {data.time}
            </Subhead> : null}
          <Icon28MoreHorizontal
            style={{ flexBasis: '1%', cursor: 'pointer', marginTop: '-5px' }}
            getRootRef={refMore}
            onClick={() => State.setPopout(<More refMore={refMore} data={data} />)}
          />
        </div>
      </div>
      <Text weight='3' className="comments-block-comment-info-text" style={{ overflow: 'hidden', marginLeft: '65px', marginTop: '-25px', width: '84%', wordBreak: 'break-word' }}>
        {textLength > 120 ?
          isExpanded ? data.message : `${data.message.slice(0, 120)}...`
          : data.message}
        {textLength > 120 && !isExpanded ?
          <Link onClick={toggleText}>
            Читать
          </Link> : null
        }
      </Text>

      {platform !== 'vkcom' ?
        <Subhead
          className="comments-block-comment-info-time"
          weight='3'
          style={{ textAlign: 'right', flexBasis: '100%' }}
        >
          {data.time}
        </Subhead> : null}
      <ReportInfo reports={data.strikes} type={ReportInfoType.comment} />
    </Div >
    <Spacing size={8} />
    <Separator />
  </>
  )
});