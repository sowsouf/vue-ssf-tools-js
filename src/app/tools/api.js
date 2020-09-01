/**
 * File app/tools/api.js
 *
 * @author sofianeakbly
 **/

import cookie from "json-cookie";
import $http  from 'axios'

import _ from 'lodash'

class Api {
  set server(value) {
    this._server = value;
  }

  attributes = ['server', 'token'];

  _server;
  token;

  constructor(attributes) {
    _.forEach(attributes, (value, attribute) => {
      if (this.attributes.includes(attribute))
        this[attribute] = value
    })
  }

  config(method, path, options = null) {
    if (this._server) {
      let config = { method: method.toUpperCase(), url: `${this._server}${path}`, headers: {} };
      if (options) {
        if (options.data)
          config.data = options.file ? options.data : { data: options.data };
      }
      config.headers = this.__configHeaders(options);
      return config
    } else throw "L'adresse du serveur n'est pas définie"
  }

  request(method, path, options = {}) {
    return new Promise((resolve, reject) => {
      if (options.loading)
        (options.loading)();

      $http(this.config(method, path, options))
        .then((response) => resolve(response && response.data && response.data.data ? response.data.data : response))
        .catch((error) => reject(error))
        .finally(() => options.loading ? (options.loading)(false) : true)
    })
  }

  fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
      this.request('GET', url, options)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  fetchBy(url, parameter, options = {}) {
    return this.fetch(`${url}/${parameter}`, options)
  }

  create(url, data, options = {}) {
    return new Promise((resolve, reject) => {
      this.request('POST', url, { ...options, ...{ data } })
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  update(url, id, data, options = {}) {
    return new Promise((resolve, reject) => {
      this.request('PUT', `${url}/${id}`, { ...options, ...{ data } })
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  destroy(url, id, options = {}) {
    return new Promise((resolve, reject) => {
      this.request('DELETE', `${url}/${id}`, options)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  __configHeaders(options) {
    let headers = {};
    if (options && options.headers)
      headers = options.headers;
    if (!(headers['Content-Type']))
      headers['Content-Type'] = 'application/json';
    if (this.token)
      headers['Authorization'] = `Bearer ${cookie.get(this.token)}`;
    return headers;
  }

}

export default Api
