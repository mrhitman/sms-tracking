import axios from "axios";

class Api {
  constructor(options = {}) {
    this.client = options.client || axios.create();
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
        if (
          !this.refreshToken ||
          error.response.status !== 401 ||
          error.config.retry
        ) {
          throw error;
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post("/user/refresh", {
            refreshToken: this.refreshToken
          });
        }
        const { data } = await this.refreshRequest;
        this.token = data.token;
        this.refreshToken = data.refreshToken;
        const newRequest = {
          ...error.config,
          retry: true
        };

        return this.client(newRequest);
      }
    );
  }

  async login({ email, password }) {
    const { data } = await this.client.post("/user/login", { email, password });
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


  getOrders(id) {
    return this.client(`/order/${id}`);
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

  unpauseOrder(data) {
    return this.client.post("/order/unpause", data);
  }

  loadOrders(type, data) {
    return this.client.post(`/order/load/${type}`, data);
  }

  getSmsTemplates(id) {
    return this.client(`/sms-template/${id}`);
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
    return this.client(`/sms/${id}`);
  }
}

export default new Api({});
