import axios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";
import {
  areasInterface,
  rolesInterface,
} from "../../src/pages/dashboard/usuarios/new";

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

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (response.data.message != null && !response.data.message) {
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

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async commerceDefaults() {
    const defaults = {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "es-ES,es;q=0.9",
        "cache-control": "max-age=86400",
        "upgrade-insecure-requests": "1",
        "Access-Control-Allow-Origin":
          "https://search-slave-prodlive.coppel.com",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      },
    };

    return defaults;
  }

  public async token(): Promise<any> {
    const session: any = await getSession();
    const token = session.user.data;

    return token;
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

  public async getModulos(): Promise<any[]> {
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

  public async saveModulos(form: {}): Promise<any> {
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

  public async getAreas(): Promise<areasInterface[]> {
    const res = await axios
      .get(`${pathServer}/areas/get`, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    return res.data.data;
  }

  // get roles
  public async getRoles(): Promise<rolesInterface[]> {
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

  public async getBases(): Promise<any> {
    const res = await axios
      .get(`${pathServer}/BI/get`, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res.data.data;
  }

  // crear base facebook
  public async saveBases(user: {}): Promise<any> {
    const res = await axios
      .post(`${pathServer}/BI/save`, user, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // base
  public async updateBases(form: {}): Promise<any> {
    const res = await axios
      .post(`${pathServer}/BI/Update`, form, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // eliminar base
  public async basesDelete(data: {}): Promise<any> {
    return await axios
      .post(`${pathServer}/BI/delete`, data, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  // get opciones rol
  public async getOpcionesRol(form: {}): Promise<any> {
    const res = await axios.post(
      `${pathServer}/modulos/getOpcionesRol`,
      form,
      await this.defaults()
    );
    return res;
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

  // get feed list
  public async getFeedList(data: {}): Promise<any> {
    const res = await axios
      .get(`${pathServer}/productfeed/getFeedList`, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  public async getFeedItems(data: any): Promise<any> {
    /// productfeed/getPaginatedFeedItems/
    const res = await axios
      .get(`${pathServer}/productfeed/getPaginatedFeedItems`, {
        params: {
          feedId: data.idFeed,
          filters: data.filters,
          page: data.page,
          pageSize: data.pageSize,
          search: data.search,
          sort: data.sort,
          sortDirection: data.sortDirection,
          offset: data.offset,
        },
        headers: {
          "Request-Source": "kraken",
          "Content-Type": "multipart/form-data",
          authorization: await this.token(),
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // get feed exclusion list

  public async getFeedExclusions(data: any): Promise<any> {
    const result = await axios
      .get(`${pathServer}/productfeed/getExclusionsList`, {
        params: {
          data,
        },
        headers: {
          "Request-Source": "kraken",
          "Content-Type": "multipart/form-data",
          authorization: await this.token(),
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
    return result;
  }

  // create feed exclusion

  public async addExclusion(data: {}): Promise<any> {
    return await axios
      .post(`${pathServer}/productfeed/addExclusion`, data, {
        headers: {
          "Request-Source": "kraken",
          "Content-Type": "multipart/form-data",
          authorization: await this.token(),
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  // delete feed exclusion

  public async deleteExclusion(data: {}): Promise<any> {
    return await axios
      .post(`${pathServer}/productfeed/deleteExclusion`, data, {
        headers: {
          "Request-Source": "kraken",
          "Content-Type": "multipart/form-data",
          authorization: await this.token(),
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  // get feed alerts list

  public async getAlertList(data: any): Promise<any> {
    const result = await axios
      .get(`${pathServer}/productfeed/getAlertList`, {
        params: {
          data,
        },
        headers: {
          "Request-Source": "kraken",
          "Content-Type": "multipart/form-data",
          authorization: await this.token(),
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
    return result;
  }

  // orden de modulos

  public async updateOrdenModulos(form: {}): Promise<any> {
    const res = await axios.post(
      `${pathServer}/modulos/updateOrdenModulos`,
      form,
      await this.defaults()
    );
    return res;
  }

  // crea rol

  public async saveRoles(user: {}): Promise<any> {
    const res = await axios
      .post(`${pathServer}/roles/save`, user, await this.defaults())

      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // update rol

  public async updateRoles(form: {}): Promise<any> {
    const res = await axios
      .post(`${pathServer}/roles/update`, form, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // crear area

  public async saveAreas(user: {}): Promise<any> {
    const res = await axios
      .post(`${pathServer}/areas/save`, user, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    return res;
  }

  // editar area

  public async updateAreas(form: {}): Promise<any> {
    const res = await axios
      .post(`${pathServer}/areas/update`, form, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // crear usuario

  public async saveUser(user: {}): Promise<any> {
    const res = await axios.post(
      `${pathServer}/users/save`,
      user,
      await this.defaults()
    );
    return res;
  }

  // get twitter

  public async getTwitter(form: {}): Promise<any> {
    const res = await axios
      .post(`${pathServer}/tendencias/get`, form, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // get profile

  public async getProfile(): Promise<any> {
    const res = await axios.get(
      `${pathServer}/users/getprofile`,
      await this.defaults()
    );
    return res;
  }

  // update user

  public async updateUser(user: {}): Promise<any> {
    const res = await axios.post(
      `${pathServer}/users/update`,
      user,
      await this.defaults()
    );
    return res;
  }

  public async downloadSitemap(form: {}): Promise<any> {
    const res = await axios.post(
      `${pathServer}/productfeed/downloadSitemap`,
      form,
      await this.defaults()
    );
    return res;
  }

  public async getTokenUser(form: {}): Promise<any> {
    const res = await axios.post(
      `${pathServer}/pushNotifications/getTokenUser`,
      form,
      await this.defaults()
    );
    return res;
  }

  public async pushNotificationsGet(form: {}): Promise<any> {
    const res = await axios.post(
      `${pathServer}/pushNotifications/get`,
      form,
      await this.defaults()
    );
    return res;
  }

  public async pushNotificationsTest(form: {}): Promise<any> {
    const res = await axios
      .post(
        `${pathServer}/pushNotifications/pushTest`,
        form,
        await this.defaults()
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  public async getMedios(): Promise<any> {
    const res = await axios.get(
      `${pathServer}/medios/get`,
      await this.defaults()
    );
    return res;
  }

  public async getFuentes(): Promise<any> {
    const res = await axios.get(
      `${pathServer}/fuentes/get`,
      await this.defaults()
    );
    return res;
  }

  public async pushNotificationsSave(form: {}): Promise<any> {
    const res = await axios
      .post(`${pathServer}/pushNotifications/save`, form, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  public async getTopics(): Promise<any> {
    const res = await axios.get(
      `${pathServer}/topics/get`,
      await this.defaults()
    );
    return res;
  }

  // update user birthday

  public async userCumple(user: {}): Promise<any> {
    const res = await axios.post(
      `${pathServer}/users/cumple`,
      user,
      await this.defaults()
    );

    return res;
  }

  // update user photo

  public async userPhoto(user: {}): Promise<any> {
    const res = await axios.post(
      `${pathServer}/users/photo`,
      user,
      await this.defaults()
    );

    return res;
  }

  public async getSmartLink(): Promise<any> {
    const res = await axios
      .get(`${pathServer}/smart-links`, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res.data.data;
  }

  public async getCorreoRecuperarPassword(): Promise<any> {
    const res = await axios.get(
      `${pathServer}/clienteDigital/getCorreoRecuperarPassword`,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })

    return res
  }
  public async getProceso(form: {}) {
    const res = await axios.post(
      `${pathServer}/procesos/get`,
      form,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })

    return res
  }

  public async importRecoverPassword(form: {}) {
    const res = await axios.post(
      `${pathServer}/clienteDigital/importRecoverPassword`,
      form,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })

    return res
  }
  public async GetUserInfo(form: {}) {
    const res = await axios.post(
      `${pathServer}/users/GetUserInfo`,
      form,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })
    return res
  }


  public async GetEstatusPeticiones() {
    const res = await axios.get(
      `${pathServer}/peticionesUsuarios/GetEstatusPeticiones`,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })
    return res
  }

  public async GetTiposPeticiones() {
    const res = await axios.get(
      `${pathServer}/peticionesUsuarios/GetTiposPeticiones`,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })
    return res
  }
  public async getByRol(form: {}) {
    const res = await axios.post(
      `${pathServer}/users/getByRol`,
      form,
      await this.defaults()
    )
    return res
  }

  public async GetPeticionesFiltros(form: {}) {
    const res = await axios.post(
      `${pathServer}/peticionesUsuarios/getPeticionesFiltros`,
      form,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })
    return res
  }

  public async getPeticionId(form: {}) {
    const res = await axios.post(
      `${pathServer}/peticionesUsuarios/getPeticionId`,
      form,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })
    return res
  }

  public async getUserName() {
    const res = await axios.get(
      `${pathServer}/users/getUserName`,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })
    return res
  }

  public async getComentarios(form: {}) {
    const res = await axios.post(
      `${pathServer}/peticionesUsuarios/getComentarios`,
      form,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })
    return res
  }

  //    function dehash() {
  //   let diccionario = "abehimoprstuv";
  //   let seed = 83503320370387;
  //   let str = "";
  //   for (let i = 0; i < 10; i++) {
  //     let realNumber = seed % 17;
  //     seed = (seed - realNumber) / 17;

  //     str += diccionario[realNumber];
  //   }

  //   return str;
  // }


  public async getRevisoresPeticion(form: {}) {
    const res = await axios.post(
      `${pathServer}/peticionesUsuarios/getRevisores`,
      form,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })
    return res
  }
  public async getManuales() {
    const res = await axios.get(
      `${pathServer}/manuales/get`,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })
    return res
  }




  // crear formulario smart-link
  public async saveSmartLink(user: {}): Promise<any> {
    const res = await axios
      .post(`${pathServer}/smart-links`, user, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // update smartlinks
  public async updateSmartLinks(data: {}): Promise<any> {
    return await axios
      .put(`${pathServer}/smart-links`, data, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  // delete smart link
  public async deleteSmartLinks(id: string): Promise<any> {
    const result = await axios
      .delete(`${pathServer}/smart-links/${id}`, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return result;
  }

  // get afore
  public async aforeGet(sn: boolean): Promise<any> {
    const res = await axios
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .get(`${pathServer}/afore?sn=${sn}`, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // delete afore
  public async aforeDelete(id: string): Promise<any> {
    const res = await axios
      .delete(`${pathServer}/afore?id=${id}`, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // update afore
  public async aforeUpdate(data: {}): Promise<any> {
    const res = await axios
      .put(`${pathServer}/afore`, data, await this.defaults())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return res;
  }

  // crear carruseles

  public async crearCarrusel(form: {}): Promise<any> {
    const res = await axios.post(
      `${pathServer}/creadorCarrusel/crearCarrusel`,
      form,
      await this.defaults()
    );
    return res;
  }

  // rest api get categories

  public async getSiteCategories(): Promise<any> {
    const res = await axios.get(
      `${pathServer}/search/resources/store/10151/categoryview/@top`,
      await this.defaults()
    );
    return res;
  }

  public async acortarUrl(form: {}): Promise<any> {
    const res = await axios.post(
      `${pathServer}/herramientas/acortarurl`,
      form,
      await this.defaults()
    ).then(response => {
      return response
    })
      .catch(error => {
        return error.response
      })
    return res
  }

}

export default new ApiService();
