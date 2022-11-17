import { getSession, signOut, useSession } from "next-auth/react";
import { Box, Button, Center, Spacer, Text } from "@chakra-ui/react";
import { KAvatar } from "../../../components/react";
import KText from "../../../components/text/KText";
import { EditIcon } from "@chakra-ui/icons";
import KIconbutton from "../../../components/iconbutton/KIconbutton";
import { DateTime } from "luxon";

export default function UserProfile(): any {
  const { data: session } = useSession();

  if (session == null) {
    return null;
  }
  const { nb_usuario, de_email, fh_cumpleanios, fh_registro, de_rol, nb_area } =
    // @ts-expect-error

    session.user.user;
  //console.log("Hola");
  //console.log(session.user.user);

  return (
    <Box
      bg={"gray.100"}
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
          <KText content={de_rol}></KText>
          <Box color={"gray.500"}>
            <KText content={nb_area}></KText>
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
            <KText content={nb_usuario}></KText>
          </Box>
        </Box>

        <Box as="span" color="gray.500" fontSize="lg">
          <KText content={"Correo Electronico"}></KText>
          <Box color={"black"} fontSize={"md"} pb={4}>
            <KText content={de_email}></KText>
          </Box>
        </Box>

        <Box as="span" color="gray.500" fontSize="lg">
          <KText content={"Fecha de Registro"}></KText>
          <Box color={"black"} fontSize={"md"} pb={3}>
            <Text>
              {DateTime.fromISO(fh_registro).toFormat("dd MMMM, yyyy", {
                locale: "es",
              })}
            </Text>
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
          <Text>
            {DateTime.fromISO(fh_cumpleanios).toFormat("dd MMMM, yyyy", {
              locale: "es",
            })}
          </Text>
        </Box>
      </Box>

      <Box pt={10}>
        <Button
          colorScheme={"gray"}
          size={"lg"}
          onClick={async () => await signOut({ callbackUrl: "/login" })}
        >
          <KText content="Cerrar Sesion"></KText>
        </Button>
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
