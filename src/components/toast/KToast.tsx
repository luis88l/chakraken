import { Button, useToast } from "@chakra-ui/react";

function KToast(): any {
  const toast = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: "Cuenta creada exitosamente.",
          description: "Hemos creado su cuenta.",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      }
    >
      Mostrar Toast
    </Button>
  );
}

export default KToast;
