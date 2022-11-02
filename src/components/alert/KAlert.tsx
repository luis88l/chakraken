import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertStatus,
} from "@chakra-ui/react";
import { FC } from "react";

export interface KAlertProps {
  /**
   * Este es el estatus/tipo de la alerta
   * (info, warning, succes, error, loading)
   */
  status: AlertStatus;
  /**
   * Esto es el titulo del Alert
   */
  title: string;
  /**
   * Este es el texto dentro del Alert
   */
  text?: string;
  /**
   * Icono del Alert
   */
  icon?: boolean;
}

const KAlert: FC<KAlertProps> = ({ status, title, text, icon }) => {
  return (
    <Alert status={status} borderRadius={"15px"} color="black">
      {(icon ?? false) && <AlertIcon />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
};

export default KAlert;
