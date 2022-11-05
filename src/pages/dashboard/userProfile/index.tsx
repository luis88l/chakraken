import { getSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import { KAvatar } from "../../../components/react";
import KText from "../../../components/text/KText";
import KButton from "../../../components/button/KButton";

export default function UserProfile(): any {
  /*
  return (
    <>
      <KPage title="Perfil de usuario">
        <Box shadow={"lg"} borderWidth="2px" overflow={"hidden"}>
          <KAvatar size={"2xl"} name={"Admin"} src={""}></KAvatar>
          <KText content={"informacion de contacto"} />
          <KText content={"Default"}></KText>
        </Box>
      </KPage>
    </>
  );
  */

  return (
    <Box
      maxW="sm"
      borderWidth="2px"
      borderRadius="lg"
      overflow="hidden"
      shadow={"2xl"}
    >
      <Box p="20">
        <Box textAlign={"center"}>
          <KAvatar size={"2xl"} name={"Admin"} src={""}></KAvatar>
        </Box>
        <Box
          textAlign={"center"}
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          <KText content={"ADMINISTRADOR"}></KText>
        </Box>

        <Box>
          <Box as="span" color="gray.600" fontSize="sm" textAlign={"center"}>
            <KText content={"default"}></KText>
          </Box>
        </Box>
      </Box>
      <Box>
        <KText content={"INFORMACION DEL CONTACTO"}></KText>
      </Box>

      <Box mt={"3"}>
        <Box as="span" color="gray.600" fontSize="sm">
          <KText content={"nombre de usuario"}></KText>
        </Box>
        admin
        <Box as="span" color="gray.600" fontSize="sm">
          <KText content={"Correo Electronico"}></KText>
        </Box>
        emilianox1311@gmail.com
        <Box as="span" color="gray.600" fontSize="sm">
          <KText content={"Fecha de Registro"}></KText>
        </Box>
        08/11/2019
        <Box as="span" color="gray.600" fontSize="sm">
          <KText content={"Fecha de Nacimiento"}></KText>
        </Box>
        13/11/2002
      </Box>
      <Box mt={"10"}>
        <KButton
          colorScheme={"gray"}
          size={"md"}
          title={"Cerrar Sesion"}
        ></KButton>
      </Box>
    </Box>
  );
}

export async function getServerSideProps(context: { req: any }): Promise<any> {
  const session = await getSession({ req: context.req });

  if (session == null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
