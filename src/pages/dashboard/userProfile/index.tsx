import { getSession } from "next-auth/react";
import { Box, Center, Spacer } from "@chakra-ui/react";
import { KAvatar } from "../../../components/react";
import KText from "../../../components/text/KText";
import KButton from "../../../components/button/KButton";
import { EditIcon } from "@chakra-ui/icons";
import KIconbutton from "../../../components/iconbutton/KIconbutton";

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
      p={10}
      maxW="inismtial"
      borderWidth="3px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={"dark-lg"}
      w={"370px"}
    >
      <Center p={14}>
        <Box textAlign={"center"}>
          <KAvatar size={"2xl"} name={"Admin"} src={""}></KAvatar>
          <KText content={"Administrador"}></KText>
          <KText content={"default"}></KText>
        </Box>
      </Center>

      <Box mb={5}>
        <Box fontSize={"lg"} alignItems={"center"} mb={"5"} display={"flex"}>
          <KText content={"Informacion de contacto"}></KText>
          <Spacer />
          <KIconbutton arialabel={""} icon={<EditIcon />}></KIconbutton>
        </Box>

        <Box mb={3} as="span" color="gray.600" fontSize="lg">
          <KText content={"nombre de usuario"}></KText>
        </Box>
        <KText content={"admin"}></KText>
        <Box mt={30} mb={3} as="span" color="gray.600" fontSize="lg">
          <KText content={"Correo Electronico"}></KText>
        </Box>
        <KText content={"emilianox1311@gmail.com"}></KText>
        <Box as="span" color="gray.600" fontSize="lg">
          <KText content={"Fecha de Registro"}></KText>
        </Box>
        <KText content={"08/11/2019"}></KText>
        <Box color="gray.600" fontSize="lg" display="flex" alignItems="center">
          <KText content={"Fecha de Nacimiento"}></KText>
          <Spacer />
          <KIconbutton arialabel={""} icon={<EditIcon />}></KIconbutton>
        </Box>
        <KText content={"13/11/2002"}></KText>
      </Box>

      <Box mt={10} alignItems="left">
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
