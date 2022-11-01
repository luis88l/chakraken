import { Button, useToast } from "@chakra-ui/react";
import { FC } from "react";

export interface KToastProps {
  title: string;
  description: string;
  status: "success" | "info" | "warning" | "error" | "loading" | undefined;
  duration: number;
  isClosable: boolean;
}

const KToast: FC<KToastProps> = ({}) => {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Mostrar Toast
    </Button>
  );
};

export default KToast;
