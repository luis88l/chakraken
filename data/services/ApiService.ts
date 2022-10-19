import axios, { AxiosError } from "axios"
import { getSession, useSession } from "next-auth/react"

interface User {
	nombre: string
	rol: string
	usuario: string
	area: string
	password: string
}

axios.interceptors.response.use(undefined, function (error: AxiosError<any>) {
	const { response, config } = error
	const newResponse: any = {}
	const newConfig: any = {
		url: config.url,
		method: config.method,
		headers: config.headers,
	}

	if (config.url != null) {
		newConfig.data = config.data
	}

	if (response != null) {
		if (response.status === 404) {
			return Promise.reject(error)
		}

		newResponse.status = response.status
		newResponse.statusText = response.statusText
		newResponse.headers = response.headers

		if (response.data != null && response.data.message) {
			newResponse.dataMessage = response.data.message
		}
	}

	// bugsnag.notify(error, {
	//     metaData: {
	//         response: newResponse,
	//         config: newConfig
	//     }
	// })

	return Promise.reject(error)
})

interface GetUserResponse {
	Data: User
}

let pathServer = "http://localhost:8080"

const hostname = "localhost"

if (hostname === "localhost") {
	pathServer = "http://localhost:8080"
} else if (hostname === "178.128.100.37") {
	pathServer = "http://178.128.100.37:8080"
} else {
	pathServer = "https://apikraken.coppel.com"
}

export class ApiService {
	public async defaults() {
		const session: any = await getSession()
		let defaults = {
			headers: {
				"Request-Source": "kraken",
				"Content-Type": "multipart/form-data",
				authorization: session.user.data,
			},
		}
		return defaults
	}

	public async getOpcionesUsuario(form: {}) {
		const res = await axios.post(
			`${pathServer}/modulos/getOpcionesUsuario`,
			form,
			await this.defaults()
		)
		return res.data.data[0]
	}
}

export default new ApiService()
