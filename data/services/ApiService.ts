import axios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";

interface User {
  nombre: string;
  rol: string;
  usuario: string;
  area: string;
  password: string;
}

axios.interceptors.response.use(
  undefined,
  async function (error: AxiosError<any>) {
    const { response, config } = error;
    const newResponse: any = {};

    if (config != null) {
      const newConfig: any = {
        url: config.url,
        method: config.method,
        headers: config.headers,
      };

      if (config.url != null) {
        newConfig.data = config.data;
      }
    }

    if (response != null) {
      if (response.status === 404) {
        return await Promise.reject(error);
      }

      newResponse.status = response.status;
      newResponse.statusText = response.statusText;
      newResponse.headers = response.headers;

      if (response?.data?.message) {
        newResponse.dataMessage = response.data.message;
      }
    }

    return await Promise.reject(error);
  }
);

interface GetUserResponse {
  data: any;
  Data: User;
}

let pathServer = "http://localhost:8080";

const hostname = "localhost";

if (hostname === "localhost") {
  pathServer = "http://localhost:8080";
} else if (hostname === "178.128.100.37") {
  pathServer = "http://178.128.100.37:8080";
} else {
  pathServer = "https://apikraken.coppel.com";
}

export class ApiService {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async defaults() {
    const session: any = await getSession();
    const defaults = {
      headers: {
        "Request-Source": "kraken",
        "Content-Type": "multipart/form-data",
        authorization: session.user.data,
      },
    };
    return defaults;
  }

  // opciones usuarios menu

  public async getOpcionesUsuario(form: {}): Promise<void> {
    const res = await axios.post(
      `${pathServer}/modulos/getOpcionesUsuario`,
      form,
      await this.defaults()
    );
    return res.data.data;
  }

  // obtener lista de modulos

  public async getModulos(): Promise<void> {
    const res = await axios
      .get(`${pathServer}/modulos/get`, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res.data.data;
  }

  // actualizar modulo

  public async updateModulos(form: {}): Promise<void> {
    const res = await axios
      .post(`${pathServer}/modulos/Update`, form, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // crear modulo

  public async saveModulos(form: {}): Promise<void> {
    const res = await axios
      .post(`${pathServer}/modulos/save`, form, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // get areas

  public async getAreas(): Promise<void> {
    console.log("hi areas");
    const res = await axios
      .get(`${pathServer}/areas/get`, await this.defaults())
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    console.log(res);
    return res.data.data;
  }

  // get roles

  public async getRoles(): Promise<void> {
    const res = await axios
      .get(`${pathServer}/roles/get`, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res.data.data;
  }

  // get usuarios

  public async getUsers(form: {}): Promise<any> {
    const res = await axios.post<GetUserResponse>(
      `${pathServer}/users/get`,
      form,
      await this.defaults()
    );
    return res;
  }
}

export default new ApiService();
