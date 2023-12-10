import axios from "axios";

export default function useApi(api) {
  return new ApiExecuter(api.caller, api.successFunc, api.errorFunc);
}

class ApiExecuter {
  constructor(api, successFunc, errorFunc) {
    this.api = api();
    this.successFunc = successFunc ?? (() => {});
    this.errorFunc = errorFunc ?? ((responce) => {alert(responce)});
  }
  execute() {
    switch (this.api.method) {
      case "GET":
        this.getExecute();
        break;
      case "POST":
        this.postExecute();
        break;
      case "PUT":
        this.putExecute();
        break;
      case "DELETE":
        this.deleteExecute();
        break;
    }
  }
  getExecute() {
    axios
      .get(`${process.env.VUE_APP_API_BASE_URL}${this.api.path}`, {
        params: { ...this.api.requestData },
      })
      .then((object) => this.successFunc(object.data))
      .catch((object) => this.errorFunc(object.data));
  }
  postExecute() {
    axios
      .post(`${process.env.VUE_APP_API_BASE_URL}${this.api.path}`, this.api.requestData)
      .then((object) => this.successFunc(object.data))
      .catch((object) => this.errorFunc(object.data));
  }
  putExecute() {
    axios
      .put(`${process.env.VUE_APP_API_BASE_URL}${this.api.path}`, this.api.requestData)
      .then((object) => this.successFunc(object.data))
      .catch((object) => this.errorFunc(object.data));
  }
  deleteExecute() {
    axios
      .delete(`${process.env.VUE_APP_API_BASE_URL}${this.api.path}`, {
        data: { ...this.api.requestData },
      })
      .then((object) => this.successFunc(object.data))
      .catch((object) => this.errorFunc(object.data));
  }
}
