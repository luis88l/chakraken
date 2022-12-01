import { getSession, signOut, useSession } from "next-auth/react";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  IconButton,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { KAvatar } from "../../../components/react";
import KText from "../../../components/text/KText";
import { EditIcon } from "@chakra-ui/icons";
import { DateTime } from "luxon";
import React, { useState } from "react";
import KPage from "../../../components/page/KPage";

export default function UserProfile(this: any): any {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const [showinp, setShowinp] = useState(false);

  if (session == null) {
    return null;
  }
  const { nb_usuario, de_email, fh_cumpleanios, fh_registro, de_rol, nb_area } =
    // @ts-expect-error

    session.user.user;
  /*
  const [datos, setDatos] = useState({
    fechac: "",
  });

  const guardado = (event) => {
    setDatos({
      ...datos,
      [event.target.name] : event.target.value
    })
  }
  

  const enviarDatos = (event) => {
    event.preventDefault();
  };
  */

  <Flex overflow={"scroll"}></Flex>;
  return (
    <KPage title={"Perfil de Usuario"}>
      <Box
        bg={"gray.100"}
        p={10}
        maxW="inismtial"
        borderWidth="3px"
        borderRadius="lg"
        overflow="scroll"
        boxShadow={"dark-lg"}
        w={"370px"}
        letterSpacing={1}
      >
        <Center pb={12}>
          <Box textAlign={"center"}>
            <IconButton
              onClick={() => {
                setShowinp(!showinp);
              }}
              aria-label={"files"}
              icon={<EditIcon />}
              colorScheme={undefined}
              rounded={"100"}
            ></IconButton>
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
            <Box color={"black"}></Box>
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
          <Box
            color="gray.500"
            fontSize="lg"
            display="flex"
            alignItems="center"
          >
            <KText content={"Fecha de Nacimiento"}></KText>
            <Spacer />

            <Box color={"black"}>
              <IconButton
                onClick={() => {
                  setShow(!show);
                }}
                icon={<EditIcon />}
                colorScheme={undefined}
                rounded={"none"}
                aria-label={""}
              ></IconButton>
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

        {showinp ? (
          <>
            <Box>
              <Input
                onClick={() => {
                  setShowinp(!showinp);
                }}
                type="file"
                height="100%"
                width="100%"
                position="absolute"
                top="0"
                left="0"
                opacity="0"
                aria-hidden="true"
                accept="image/*"
              />
            </Box>
          </>
        ) : (
          ""
        )}

        {show ? (
          <>
            <Box bg={"gray.200"} mt={"5"}>
              <Box textAlign="right">
                <IconButton
                  onClick={() => {
                    setShow(!show);
                  }}
                  size="xs"
                  aria-label={""}
                  icon={<CloseButton />}
                  bg={"red.400"}
                  color={"gray.100"}
                  rounded={"0"}
                  name="fechac"
                ></IconButton>
              </Box>
              <Box p={3} alignItems="center" textAlign={"center"}>
                <KText content={"¿Cual es tu fecha de nacimiento?"}></KText>
                <Input
                  mt={4}
                  bg={"gray.100"}
                  placeholder="Select date"
                  size={"md"}
                  type="date"
                ></Input>
              </Box>
              <Box p={3} textAlign={"center"}>
                <Button
                  onClick={() => {
                    setShow(!show);
                  }}
                  colorScheme={"green"}
                  size={"sm"}
                >
                  Guardar
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          ""
        )}
        <Box pt={20} textAlign="center">
          <Button
            bg={"gray.200"}
            color="black"
            size={"lg"}
            onClick={async () => await signOut({ callbackUrl: "/login" })}
          >
            <KText content="Cerrar Sesion"></KText>
          </Button>
        </Box>
      </Box>
    </KPage>
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
