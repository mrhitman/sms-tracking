import axios from "axios";

const baseUrl = "http://localhost:3000/";
class Api {
  constructor(options = {}) {
    this.client = options.client || axios.create({ baseURL: baseUrl });
    this.token = options.token || localStorage.getItem("token");
    this.refreshToken =
      options.refreshToken || localStorage.getItem("refreshToken");
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      config => {
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
      e => Promise.reject(e)
    );

    this.client.interceptors.response.use(
      r => r,
      async error => {
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
        const newRequest = {
          ...error.config,
          retry: true
        };

        return this.client(newRequest, { baseUrl });
      }
    );
  }

  ensureToken(error) {
    if (
      !this.refreshToken ||
      error.response.status !== 401 ||
      error.config.retry
    ) {
      throw error;
    }
  }

  async login({ email, password }) {
    const { data } = await this.client.post("user/login", { email, password });
    this.token = data.token;
    this.refreshToken = data.refreshToken;
    return { data };
  }

  logout() {
    this.token = null;
    this.refreshToken = null;
    return Promise.resolve();
  }

  getUser() {
    return this.client(`/user`);
  }

  updateUser(data) {
    return this.client.post("/user/update", data);
  }

  createUser(data) {
    return this.client.post("/user", data);
  }

  getOrders() {
    return this.client(`/order`);
  }

  deleteOrder(data) {
    return this.client.post("/order/delete", data);
  }

  updateOrder(data) {
    return this.client.post("/order/update", data);
  }

  createOrder(data) {
    return this.client.post("/order", data);
  }

  pauseOrder(data) {
    return this.client.post("/order/pause", data);
  }

  sendSmsOrder(data) {
    return this.client.post("/order/send-sms", data);
  }

  unpauseOrder(data) {
    return this.client.post("/order/unpause", data);
  }

  trackOrder(id) {
    return this.client(`/order/${id}/track`);
  }

  getOrderHistory(id) {
    return this.client(`/order/${id}/history`);
  }

  loadOrders(type, data) {
    return this.client.post(`/order/load/${type}`, data);
  }

  getSmsTemplates() {
    return this.client(`/sms-template`);
  }

  updateSmsTemplate(data) {
    return this.client.post(`/sms-template/update`, data);
  }

  deleteSmsTemplate(data) {
    return this.client.post(`/sms-template/delete`, data);
  }

  createSmsTemplate(data) {
    return this.client.post(`/sms-template`, data);
  }

  getSms(id) {
    return this.client(`/order/${id}/sms`);
  }
}

export default new Api();
