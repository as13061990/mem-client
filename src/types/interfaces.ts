interface IpanelProps {
  id: string;
}
interface IrequestRespons {
  error: boolean;
  error_type: number;
  data: { [key: string]: string | number | boolean };
}