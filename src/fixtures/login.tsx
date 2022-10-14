export interface loginResProps {
	status: number;
	data: string;
	user: {
		id_usuario: string;
		id_rol: string;
		id_area: string;
		nb_nombre: string;
		de_email: string;
		nb_usuario: string;
		cl_password: string;
		de_rol: string;
		fh_registro: string;
		fh_cumpleanios: string;
		user_photo: string;
		sn_activo: boolean;
		nb_area: string;
		de_tokenPush: string;
	};
}

export const loginRes = {
	status: 200,
	data: "stringdataid",
	user: {
		id_usuario: "0cf4d20b-fb89-4cb8-ba51-224563941ff4",
		id_rol: "f2320fd2-fd6f-4876-a8a5-e2c2d71f09aa",
		id_area: "9023015b-35ee-41f5-9d26-5c34d94d1e0e",
		nb_nombre: "Administrador",
		de_email: "admin@admin.com",
		nb_usuario: "admin",
		cl_password: "c8622a28db2443931487f0ce6c1a9827f26fb7c7",
		de_rol: "default",
		fh_registro: "2019-11-08T19:39:43.248Z",
		fh_modificado: "2019-11-08T19:39:43.249Z",
		fh_cumpleanios: "1994-06-27T07:00:00.000Z",
		user_photo:
			"photoprofile-0cf4d20b-fb89-4cb8-ba51-224563941ff415-10-2021-13-53.png",
		sn_activo: true,
		nb_area: "default",
		de_tokenPush: "stringtoken",
	},
};

export const userLogin = async ({ username, password }) => {
	console.log(username, password);
	return new Promise<loginResProps>((resolve, reject) => {
		setTimeout(() => {
			if (username === "admin" && password === "admin") {
				resolve(loginRes);
			} else {
				reject();
			}
		}, 3000);
	});
};
