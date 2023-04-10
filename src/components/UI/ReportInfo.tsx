import { Text } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import State from "../../store/State";
import { modals } from "../../types/enums";

export enum ReportInfoType {
  comment = 'comment',
  meme = 'meme',
  user = 'user'
}

export const ReportInfo = observer(({ reports, type }: { reports: Istrikes, type: ReportInfoType }) => {
  let styles

  if (type === ReportInfoType.meme) {
    styles = { cursor: 'pointer', marginLeft: '10px', color: 'red' }
  } else if (type === ReportInfoType.comment) {
    styles = { cursor: 'pointer', width: '120px', color: 'red', marginLeft: 'auto' }
  } else if (type === ReportInfoType.user) {
    styles = { cursor: 'pointer', color: 'red' }
  }

  const reportsCount: any = Object.values(reports).reduce((cur: number, acc: number) => cur + acc, 0)
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    State.setReportInfo(reports);
    State.setActiveModal(modals.REPORTINFO);
    e.stopPropagation()
  }
  return (
    <>
      {State.isAdmin() ?
        <Text weight='2' style={styles} onClick={(e) => onClick(e)}>
          Жалобы - {reportsCount}
        </Text>
        : null}
    </>
  )
});

export default ReportInfo
