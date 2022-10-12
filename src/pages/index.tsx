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
} from "@chakra-ui/react";
import { FiLock, FiUser } from "react-icons/fi";

import { useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";

const Index = () => {
	const [showPassword, setShowPassword] = useState(false);
	const handleShowClick = () => setShowPassword(!showPassword);
	const userInputRef = useRef();
	const passwordInputRef = useRef();

	async function loginSubmitHandler(event) {
		event.preventDefault();
		console.log(userInputRef.current, passwordInputRef.current);
	}

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
					<form onSubmit={loginSubmitHandler}>
						<Stack
							spacing={4}
							p="2rem"
							bgColor="#fff"
							boxShadow="md"
							borderRadius={15}
						>
							<FormControl>
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="#333">
										<FiUser color="#333" />
									</InputLeftElement>
									<Input type="text" placeholder="Usuario" ref={userInputRef} />
								</InputGroup>
							</FormControl>
							<FormControl>
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="#333">
										<FiLock color="#333" />
									</InputLeftElement>
									<Input
										ref={passwordInputRef}
										type={showPassword ? "text" : "password"}
										placeholder="Contraseña"
									/>
									<InputRightElement width="4.5rem">
										<Button
											h="1.75rem"
											size="sm"
											onClick={handleShowClick}
											color="#555050"
										>
											{showPassword ? "Ocultar" : "Mostrar"}
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
								_hover={{ bg: "#4d4d4d" }}
							>
								Login
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Index;
