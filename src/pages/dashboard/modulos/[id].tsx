import { useState } from "react"
import { getSession } from "next-auth/react"
import KPage from "../../../components/page/KPage"
import ApiService from "../../../../data/services/ApiService"
import { useMutation, useQuery } from "react-query"
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
	Textarea,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

export interface modulosTable {
	nb_modulo: string
	id_modulo: string
	nu_orden: number
	acciones: string
}

export default function Modulo() {
	const colSpan = { base: 2, md: 1 }
	const router = useRouter()
	const [nombreModulo, setNombreModulo] = useState("")
	const [claseModulo, setClaseModulo] = useState("")
	const [descripcionModulo, setDescripcionModulo] = useState("")
	const [updating, setUpdating] = useState(false)

	const {
		isLoading,
		error,
		data: modules,
	} = useQuery("modulos", () => ApiService.getModulos())

	const updateModulo = useMutation(
		(formData: any) => {
			return ApiService.updateModulos(formData)
		},
		{
			onSuccess: () => {
				router.back()
			},
		}
	)

	if (isLoading) {
		return <p>Cargando...</p>
	}

	const modulo = modules.filter(
		(modulo) => modulo.id_modulo === router.query.id
	)

	const handleSubmit = async (event) => {
		event.preventDefault()
		setUpdating(true)
		console.log(nombreModulo, claseModulo, descripcionModulo)
		const formData = new FormData()
		formData.append("id_modulo", modulo[0].id_modulo)
		formData.append(
			"nb_modulo",
			nombreModulo === "" ? modulo[0].nb_modulo : nombreModulo
		)
		formData.append(
			"de_clase",
			claseModulo === "" ? modulo[0].de_clase : claseModulo
		)
		formData.append(
			"de_modulo",
			descripcionModulo === "" && modulo[0].de_modulo !== ""
				? modulo[0].de_modulo
				: descripcionModulo
		)
		updateModulo.mutate(formData)
	}

	return (
		<KPage title={"Módulo " + modulo[0].nb_modulo}>
			<Box>
				<Text fontSize="l" fontWeight="bold">
					Actualizar módulo
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
									defaultValue={modulo[0].nb_modulo}
									onChange={(event) => {
										setNombreModulo(event.currentTarget.value)
									}}
								/>
							</FormControl>
						</GridItem>
						<GridItem colSpan={colSpan}>
							<FormControl isRequired>
								<FormLabel>Clase</FormLabel>
								<Input
									defaultValue={modulo[0].de_clase}
									onChange={(event) => {
										setClaseModulo(event.currentTarget.value)
									}}
								/>
							</FormControl>
						</GridItem>
						<GridItem colSpan={colSpan}>
							<FormControl>
								<FormLabel>Descripción</FormLabel>
								<Textarea
									defaultValue={modulo[0].de_modulo}
									onChange={(event) => {
										setDescripcionModulo(event.currentTarget.value)
									}}
								></Textarea>
							</FormControl>
						</GridItem>
						<GridItem colSpan={1}></GridItem>
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
									) : null
								}
							>
								Actualizar
							</Button>
						</GridItem>
					</SimpleGrid>
				</form>
			</Box>
		</KPage>
	)
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req })

	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		}
	}

	return { props: { session } }
}
