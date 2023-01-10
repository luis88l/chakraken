import React, { useState } from "react";
import { getSession } from "next-auth/react";
import KPage from "../../../components/page/KPage";
import ApiService from "../../../../data/services/ApiService";
import { useMutation, useQuery } from "react-query";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Text,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import KSkeletonPage from "../../../components/skeleton/KSkeletonPage";
import error from "next/error";

export interface rolesInterface {
  id_rol: string;
  de_rol: string;
  fh_registro: string;
  fh_modificado: string;
  sn_activo: boolean;
}

export interface areasInterface {
  id_area: string;
  nb_area: string;
  sn_activo: boolean;
}

export default function New(): any {
  const colSpan = { base: 2, md: 1 };
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = (): any => setShowPassword(!showPassword);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [rol, setRol] = useState("");
  const [area, setArea] = useState("");
  const [updating, setUpdating] = useState(false);

  const { isLoading: isLoadingAreas, data: areas } = useQuery<
    areasInterface[],
    error
  >("areas", async () => await ApiService.getAreas());

  const { isLoading: isLoadingRoles, data: roles } = useQuery<
    rolesInterface[],
    error
  >("roles", async () => await ApiService.getRoles());

  const crearUsuario = useMutation(
    async (formData: any) => {
      return await ApiService.saveUser(formData);
    },
    {
      onSuccess: () => {
        router.back();
      },
    }
  );

  const handleSubmit = async (event: {
    preventDefault: () => void;
  }): Promise<any> => {
    event.preventDefault();
    setUpdating(true);
    const formData = new FormData();
    formData.append("name", nombre);
    formData.append("email", email);
    formData.append("user", username);
    formData.append("password", password);
    formData.append("area", area);
    formData.append("rol", rol);
    crearUsuario.mutate(formData);
  };

  const handleRol = (event: React.ChangeEvent<HTMLInputElement>): any => {
    setRol(event.target.value);
  };

  const handleArea = (event: React.ChangeEvent<HTMLInputElement>): any => {
    setArea(event.target.value);
  };

  if (isLoadingAreas && isLoadingRoles) {
    return <KSkeletonPage />;
  }

  if (typeof areas !== "undefined" && typeof roles !== "undefined")
    return (
      <KPage title="Crear usuario">
        <Box>
          <Text fontSize="l" fontWeight="bold">
            Crear usuario
          </Text>
        </Box>
        <Divider mt={2} mb={2} />
        <Box>
          <form onSubmit={handleSubmit}>
            <SimpleGrid columns={2} spacing={5}>
              <GridItem colSpan={colSpan}>
                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    onChange={(event) => {
                      setNombre(event.currentTarget.value);
                    }}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    onChange={(event) => {
                      setEmail(event.currentTarget.value);
                    }}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={colSpan}>
                <FormControl isRequired>
                  <FormLabel>Rol</FormLabel>
                  <Select
                    placeholder="Selecciona rol"
                    defaultValue={roles[0].id_rol}
                    // @ts-expect-error
                    onChange={handleRol}
                  >
                    {roles?.map((rol: rolesInterface) => (
                      <option key={rol.id_rol} value={rol.id_rol}>
                        {rol.de_rol}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={colSpan}>
                <FormControl isRequired>
                  <FormLabel>Área</FormLabel>
                  <Select
                    placeholder="Selecciona area"
                    defaultValue={areas[0].id_area}
                    // @ts-expect-error
                    onChange={handleArea}
                  >
                    {areas?.map((area: areasInterface) => (
                      <option key={area.id_area} value={area.id_area}>
                        {area.nb_area}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem colSpan={colSpan}>
                <FormControl isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    name="newUsername"
                    onChange={(event) => {
                      setUsername(event.currentTarget.value);
                    }}
                  />
                </FormControl>
              </GridItem>
              <GridItem colSpan={colSpan}>
                <FormControl isRequired>
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      name="newPassword"
                      color="#333"
                      type={showPassword ? "text" : "password"}
                      placeholder="*******"
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleShowClick}
                        color="#555050"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </GridItem>

              <GridItem colSpan={1}>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  bg="#3a47bd"
                  borderRadius={15}
                  color="#fff"
                  rightIcon={
                    updating ? (
                      <CircularProgress
                        isIndeterminate
                        color="white"
                        size={"20px"}
                      />
                    ) : undefined
                  }
                >
                  Crear usuario
                </Button>
              </GridItem>
            </SimpleGrid>
          </form>
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
