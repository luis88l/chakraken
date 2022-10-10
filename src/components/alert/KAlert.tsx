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
}

function KAlert(props: KAlertProps) {
  return (
    <Alert status={props.status}>
      <AlertIcon />
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>{props.text}</AlertDescription>
    </Alert>
  );
}

export default KAlert;
