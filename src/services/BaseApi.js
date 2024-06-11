import { axiosInstance as ax } from "./axios";

class BaseApi {
  constructor(url) {
    this.url = url;
  }

  /**
   *
   * @param {String} params
   * @returns array data messages
   */
  async find(params = {}) {
    return await ax.get(this.url, {
      params,
    });
  }

  async post(payload) {
    return await ax.post(this.url, payload);
  }
}

export default BaseApi;
