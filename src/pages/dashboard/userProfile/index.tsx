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
      letterSpacing={1}
    >
      <Center pb={12}>
        <Box textAlign={"center"}>
          <KIconbutton
            arialabel={""}
            icon={<EditIcon />}
            colorScheme={undefined}
            rounded={"100"}
          ></KIconbutton>
          <KAvatar size={"2xl"} name={"Admin"} src={""}></KAvatar>
          <KText content={"Administrador"}></KText>
          <Box color={"gray.500"}>
            <KText content={"default"}></KText>
          </Box>
        </Box>
      </Center>

      <Box bg={""}>
        <Box fontSize={"lg"} alignItems={"center"} display={"flex"} pb={5}>
          <KText content={"Informacion de contacto"}></KText>
          <Spacer />
          <Box color={"black"}>
            <KIconbutton
              arialabel={""}
              icon={<EditIcon />}
              colorScheme={undefined}
              rounded={"none"}
            ></KIconbutton>
          </Box>
        </Box>

        <Box as="span" color="gray.500" fontSize="lg">
          <KText content={"nombre de usuario"}></KText>
          <Box color={"black"} fontSize={"md"} pb={4}>
            <KText content={"admin"}></KText>
          </Box>
        </Box>

        <Box as="span" color="gray.500" fontSize="lg">
          <KText content={"Correo Electronico"}></KText>
          <Box color={"black"} fontSize={"md"} pb={4}>
            <KText content={"emilianox1311@gmail.com"}></KText>
          </Box>
        </Box>

        <Box as="span" color="gray.500" fontSize="lg">
          <KText content={"Fecha de Registro"}></KText>
          <Box color={"black"} fontSize={"md"} pb={3}>
            <KText content={"08/11/2019"}></KText>
          </Box>
        </Box>

        <Box color="gray.500" fontSize="lg" display="flex" alignItems="center">
          <KText content={"Fecha de Nacimiento"}></KText>
          <Spacer />
          <Box color={"black"}>
            <KIconbutton
              arialabel={""}
              icon={<EditIcon />}
              colorScheme={undefined}
              rounded={"none"}
            ></KIconbutton>
          </Box>
        </Box>
        <Box fontSize={"md"}>
          <KText content={"13/11/2002"}></KText>
        </Box>
      </Box>

      <Box pt={10}>
        <KButton
          colorScheme={"gray"}
          size={"lg"}
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
