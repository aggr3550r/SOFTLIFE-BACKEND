import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class RequestUtil {
  static makePostRequest = (
    url: string,
    data: Object,
    headers?: Object,
    timeout?: number,
  ) => {
    return RequestUtil.getAxiosInstance(headers, timeout).post(url, data);
  };

  static makePutRequest = (
    url: string,
    data: Object,
    headers?: Object,
    timeout?: number,
  ) => {
    return RequestUtil.getAxiosInstance(headers, timeout).put(url, data);
  };

  static makePatchRequest = (
    url: string,
    data: Object,
    headers?: Object,
    timeout?: number,
  ) => {
    return RequestUtil.getAxiosInstance(headers, timeout).patch(url, data);
  };

  static makeGetRequest = (url: string, headers?: Object, timeout?: number) => {
    return RequestUtil.getAxiosInstance(headers, timeout).get(url);
  };

  /**
   * Single axios instance for all our calls.
   * @param headers
   * @returns
   */
  private static getAxiosInstance = (
    headers?: any,
    timeout = 30000,
  ): AxiosInstance => {
    return axios.create({
      timeout,
      headers,
    });
  };
}
