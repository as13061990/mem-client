import { Text } from "@vkontakte/vkui";
import { observer } from "mobx-react-lite";
import State from "../store/State";

export enum ReportInfoType {
  comment = 'comment',
  meme = 'meme'
}

export const ReportInfo = observer(({ reports, type }: { reports: {}, type: ReportInfoType }) => {
  let styles

  if (type === ReportInfoType.meme) {
    styles = { marginLeft: '10px', color: 'red' }
  } else {
    styles = { marginTop: '-10px', color: 'red' }
  }

  const reportsCount: any = Object.values(reports).reduce((cur: number, acc: number) => cur + acc, 0)
  return (
    <>
      {State.isAdmin() ?
        <Text weight='2' style={styles}>
          Жалобы - {reportsCount}
        </Text>
        : null}
    </>
  )
});

export default ReportInfo
