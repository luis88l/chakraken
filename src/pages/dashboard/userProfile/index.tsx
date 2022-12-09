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
import { useMutation, useQuery } from "react-query";
import ApiService from "../../../../data/services/ApiService";
import { useRouter } from "next/router";
import { usersInterface } from "../usuarios/new";

export default function UserProfile(this: any): any {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [updating, setUpdating] = useState(false);
  const [fechacumple, setFechaCumple] = useState("");
  const form = new FormData();

  //otro
  const { isLoading, data: users } = useQuery(
    "users",
    async () => await ApiService.getUsers(form)
  );

  if (session == null) {
    return;
  }
  const {
    nb_usuario,
    de_email,
    fh_cumpleanios,
    fh_registro,
    de_rol,
    nb_area,
    nb_nombre,
    cl_password,
  } =
    // @ts-expect-error

    session.user.user;

  const updateUser = useMutation(
    async (formData: any) => {
      return await ApiService.updateUser(formData);
    },
    {
      onSuccess: () => {
        router.back();
      },
    }
  );

  console.log(users);

  // @ts-expect-error
  const userDetails: usersInterface = session.user.user;

  //2
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    console.log("submit");
    event.preventDefault();
    setUpdating(true);
    const formData = new FormData();
    console.log(userDetails.fh_cumpleanios);
    formData.append("id", userDetails.id_usuario);
    formData.append("cumple", fechacumple);
    formData.append("name", nb_nombre);
    formData.append("email", de_email);
    formData.append("user", nb_usuario);
    formData.append("password", cl_password);
    formData.append("rol", de_rol);
    updateUser.mutate(formData);
  };

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
        <form>
          <Center pb={12}>
            <Box textAlign={"center"}>
              <IconButton
                onClick={() => {
                  document.getElementById("file-up")?.click();
                }}
                aria-label={"files"}
                icon={<EditIcon />}
                colorScheme={undefined}
                rounded={"100"}
              ></IconButton>
              <Input
                type="file"
                aria-hidden="true"
                accept="image/*"
                display={"none"}
                id="file-up"
              />
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
                <form
                  defaultValue={fh_cumpleanios}
                  onChange={(event) => {
                    setFechaCumple(event.currentTarget.value);
                  }}
                >
                  <Text>
                    {DateTime.fromISO(fh_registro).toFormat("dd MMMM, yyyy", {
                      locale: "es",
                    })}
                  </Text>
                </form>
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
              <Box>
                {DateTime.fromISO(fh_cumpleanios).toFormat("dd MMMM, yyyy", {
                  locale: "es",
                })}
              </Box>
            </Box>
          </Box>
        </form>
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
                  colorScheme={"green"}
                  size={"sm"}
                  type="submit"
                  onClick={handleSubmit}
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
