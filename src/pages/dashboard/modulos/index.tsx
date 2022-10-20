import { useState } from "react"
import { getSession } from "next-auth/react"
import KPage from "../../../components/page/KPage"
import ApiService from "../../../../data/services/ApiService"
import { useQuery } from "react-query"
import { createColumnHelper } from "@tanstack/react-table"
import { KTableLayout } from "../../../components/tableLayout/KTableLayout"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons"
import KButton from "../../../components/button/KButton"
import KSkeleton from "../../../components/skeleton/KSkeleton"

export interface modulosTable {
	nb_modulo: string
	id_modulo: string
	nu_orden: number
	acciones: string
}

export default function Modulos() {
	const [display, changeDisplay] = useState("hide")
	const [value, changeValue] = useState(1)

	const {
		isLoading,
		error,
		data: modules,
	} = useQuery("modulos", () => ApiService.getModulos())

	if (isLoading) {
		return <p>Is loading...</p>
	}

	const columnHelper = createColumnHelper<modulosTable>()

	const columns = [
		columnHelper.accessor("id_modulo", {
			cell: (info) => info.getValue(),
			header: "Id",
		}),
		columnHelper.accessor("nb_modulo", {
			cell: (info) => info.getValue(),
			header: "Nombre",
		}),
		columnHelper.accessor("nu_orden", {
			cell: (info) => info.getValue(),
			header: "Orden",
		}),
		columnHelper.accessor("acciones", {
			cell: (action) => <KSkeleton />,
			header: "Acciones",
		}),
	]

	return (
		<KPage title="Módulos">
			<KTableLayout
				columns={columns}
				data={modules.map(({ id_modulo, nb_modulo, nu_orden }) => ({
					id_modulo,
					nb_modulo,
					nu_orden,
				}))}
			/>
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
