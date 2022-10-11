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
  text: string;
  icon?: boolean;
}

function KAlert({ status, title, text, icon }: KAlertProps) {
  return (
    <Alert status={status}>
      {icon && <AlertIcon />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}

export default KAlert;
