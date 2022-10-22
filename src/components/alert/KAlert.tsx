import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertStatus,
} from "@chakra-ui/react";

interface KAlertProps {
  status: AlertStatus;
  title: string;
  text?: string;
  icon?: boolean;
}

function KAlert({ status, title, text, icon }: KAlertProps): any {
  return (
    <Alert status={status} borderRadius={"15px"} color="black">
      {icon && <AlertIcon />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}

export default KAlert;
