import { useState } from "react"
import { getSession } from "next-auth/react"
import KPage from "../../../components/page/KPage"
import ApiService from "../../../../data/services/ApiService"
import { useQuery } from "react-query"
import { createColumnHelper } from "@tanstack/react-table"
import { KTableLayout } from "../../../components/tableLayout/KTableLayout"

export interface modulosTable {
	nb_modulo: string
	id_modulo: string
	nu_orden: number
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

	console.log(modules)

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
