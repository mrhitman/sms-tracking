import axios from "axios";

const baseUrl = "http://localhost:3000/";
class Api {
  public client: any;
  public token: string | null;
  public refreshToken: string | null;
  public refreshRequest: any;

  constructor(options = {} as any) {
    this.client = options.client || axios.create({ baseURL: baseUrl });
    this.token = options.token || localStorage.getItem("token");
    this.refreshToken =
      options.refreshToken || localStorage.getItem("refreshToken");
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      (config: any) => {
        if (!this.token) {
          return config;
        }

        const newConfig = {
          headers: {},
          ...config
        };
        newConfig.headers.Authorization = `Bearer ${this.token}`;
        return newConfig;
      },
      (e: Error) => Promise.reject(e)
    );

    this.client.interceptors.response.use(
      (r: Response) => r,
      async (error: any) => {
        this.ensureToken(error);

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post("/user/refresh", {
            token: this.refreshToken,
            baseUrl
          });
        }
        const { data } = await this.refreshRequest;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        const newRequest = {
          ...error.config,
          retry: true
        };

        return this.client(newRequest, { baseUrl });
      }
    );
  }

  public ensureToken(error: { response: any; config: any }) {
    if (
      !this.refreshToken ||
      error.response.status !== 401 ||
      error.config.retry
    ) {
      throw error;
    }
  }

  public async login({ email, password }) {
    const { data } = await this.client.post("user/login", { email, password });
    this.token = data.token;
    this.refreshToken = data.refreshToken;
    return { data };
  }

  public logout() {
    this.token = null;
    this.refreshToken = null;
    return Promise.resolve();
  }

  public getUser() {
    return this.client(`/user`);
  }

  public updateUser(data) {
    return this.client.post("/user/update", data);
  }

  public createUser(data) {
    return this.client.post("/user", data);
  }

  public getOrders() {
    return this.client(`/order`);
  }

  public deleteOrder(data) {
    return this.client.post("/order/delete", data);
  }

  public updateOrder(data) {
    return this.client.post("/order/update", data);
  }

  public createOrder(data) {
    return this.client.post("/order", data);
  }

  public pauseOrder(data) {
    return this.client.post("/order/pause", data);
  }

  public sendSmsOrder(data) {
    return this.client.post("/order/send-sms", data);
  }

  public unpauseOrder(data) {
    return this.client.post("/order/unpause", data);
  }

  public trackOrder(id) {
    return this.client(`/order/${id}/track`);
  }

  public getOrderHistory(id) {
    return this.client(`/order/${id}/history`);
  }

  public loadOrders(type, data) {
    return this.client.post(`/order/load/${type}`, data);
  }

  public getSmsTemplates() {
    return this.client(`/sms-template`);
  }

  public updateSmsTemplate(data) {
    return this.client.post(`/sms-template/update`, data);
  }

  public deleteSmsTemplate(data) {
    return this.client.post(`/sms-template/delete`, data);
  }

  public createSmsTemplate(data) {
    return this.client.post(`/sms-template`, data);
  }

  public getSms(id) {
    return this.client(`/order/${id}/sms`);
  }
}

export default new Api();
