import { getSession } from "next-auth/react"
import KPage from "../../../components/page/KPage"
import { Box } from "@chakra-ui/react"

export default function Carruseles() {
	return (
		<KPage title="Creador de carruseles">
			<Box>hi</Box>
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
