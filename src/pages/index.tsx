import { useRouter } from "next/router"
import { getSession } from "next-auth/react"

const Index = () => {
	const router = useRouter()

	return null
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
	} else {
		return {
			props: { session },
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		}
	}
}

export default Index
