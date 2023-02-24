import {
  Flex,
  Stack,
  Heading,
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  CircularProgress,
} from "@chakra-ui/react";
import { FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/router";

import React, { useState } from "react";
import Head from "next/head";
import KAlert from "../../components/alert/KAlert";
import { getSession, signIn } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";

const Index = (): any => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = (): any => setShowPassword(!showPassword);
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captchaRef] = useState(React.createRef<ReCAPTCHA>());

  const handleSubmit = async (event: any): Promise<any> => {
    event.preventDefault();
    setError(false);
    setIsLoading(true);

    const token = await captchaRef.current?.executeAsync();
    captchaRef.current?.reset();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      token,
    });

    if (result?.ok === true) {
      void router.push("/dashboard");
    } else {
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <Flex
      className="gradient-login"
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#020202"
      color="#fff"
    >
      <Head>
        <title>Kraken | Login</title>
      </Head>
      <Stack
        flexDir="column"
        mb="1"
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          m={25}
          fontSize={["4xl"]}
          alignSelf="center"
          letterSpacing="tight"
        >
          Kraken
        </Heading>
        <Box minW={{ base: "100%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="2rem"
              bgColor="#fff"
              boxShadow="md"
              borderRadius={15}
            >
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="#333">
                    <FiUser color="#333" />
                  </InputLeftElement>
                  <Input
                    color="#333"
                    type="text"
                    placeholder="Usuario"
                    onChange={(event) => setUser(event.currentTarget.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={6}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="#333">
                    <FiLock color="#333" />
                  </InputLeftElement>
                  <Input
                    color="#333"
                    type={showPassword ? "text" : "password"}
                    placeholder="*******"
                    onChange={(event) => setPassword(event.currentTarget.value)}
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
              <Button
                mt={4}
                bgColor="blackAlpha.900"
                color="#fff"
                p={7}
                borderRadius={15}
                type="submit"
                variant="solid"
                rightIcon={
                  !isLoading ? (
                    <FiArrowRight />
                  ) : (
                    <CircularProgress
                      isIndeterminate
                      color="white"
                      size={"20px"}
                    />
                  )
                }
                _hover={{ bg: "#4d4d4d" }}
              >
                Login
              </Button>
              {/* <Button onClick={handleLogout}>logout</Button> */}
              <Box mt={10} maxW="404px">
                {error && (
                  <KAlert
                    icon
                    status={"error"}
                    title="Verifique su nombre de usuario y contraseña y vuelva a intentarlo."
                  />
                )}
              </Box>
            </Stack>
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={String(process.env.NEXT_PUBLIC_CAPTCHA_KEY)}
              size="invisible"
            />
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export async function getServerSideProps(context: { req: any }): Promise<any> {
  const session = await getSession({ req: context.req });

  if (session != null) {
    return {
      props: { session },
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

export default Index;
