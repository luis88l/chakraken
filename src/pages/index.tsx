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
import { FiLock, FiUserCheck } from "react-icons/fi";

import { useState } from "react";
import Link from "next/link";

const Index = () => {
	const [showPassword, setShowPassword] = useState(false);
	const handleShowClick = () => setShowPassword(!showPassword);

	return (
		<Flex
			flexDirection="column"
			width="100wh"
			height="100vh"
			justifyContent="center"
			alignItems="center"
			backgroundColor="#020202"
			color="#fff"
		>
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
					<form>
						<Stack
							spacing={4}
							p="2rem"
							bgColor="#fff"
							boxShadow="md"
							borderRadius={15}
						>
							<FormControl>
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300">
										<FiUserCheck color="gray.300" />
									</InputLeftElement>
									<Input type="text" placeholder="Usuario" />
								</InputGroup>
							</FormControl>
							<FormControl>
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300">
										<FiLock color="gray.300" />
									</InputLeftElement>
									<Input
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
							<Link href={"/dashboard"}>
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
							</Link>
						</Stack>
					</form>
				</Box>
			</Stack>
		</Flex>
	);
};

export default Index;
