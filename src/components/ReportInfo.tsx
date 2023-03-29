import { Text } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import State from "../store/State";
import { modals } from "../types/enums";

export enum ReportInfoType {
  comment = 'comment',
  meme = 'meme'
}

export const ReportInfo = observer(({ reports, type }: { reports: Istrikes, type: ReportInfoType }) => {
  let styles

  if (type === ReportInfoType.meme) {
    styles = { cursor: 'pointer', marginLeft: '10px', color: 'red' }
  } else {
    styles = { cursor: 'pointer', marginTop: '-10px', color: 'red' }
  }

  const reportsCount: any = Object.values(reports).reduce((cur: number, acc: number) => cur + acc, 0)
  return (
    <>
      {State.isAdmin() ?
        <Text weight='2' style={styles} onClick={() => {State.setReportInfo(reports); State.setActiveModal(modals.REPORTINFO)}}>
          Жалобы - {reportsCount}
        </Text>
        : null}
    </>
  )
});

export default ReportInfo
