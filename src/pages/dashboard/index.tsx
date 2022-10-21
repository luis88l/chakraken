/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import KPage from "../../components/page/KPage"

export default function index() {
	const [display, changeDisplay] = useState("hide")
	const [value, changeValue] = useState(1)
	const router = useRouter()

	return <KPage title="Inicio">hi</KPage>
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
