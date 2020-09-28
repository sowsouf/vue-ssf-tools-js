import API from './api'

const Api = new API();

class Model {

  static __exec(server, url, method, options = {}) {
    if (this[method]) {
      Api.server = server;
      return eval(this[method](url, options))
    }
    throw `La méthode ${method} n'existe pas`
  }

  static all(url, options = {}) {
    return new Promise((resolve, reject) => {
      Api.fetch(url, options).then(
        (response) => resolve(response),
        (error) => reject(error),
      )
    })
  }

  static mine(url, options = {}) {
    return new Promise((resolve, reject) => {
      Api.fetchBy(url, 'mine', options).then(
        (response) => resolve(response),
        (error) => reject(error),
      )
    })
  }

  static paginator(url, options = {}) {
    return new Promise((resolve, reject) => {
      Api.fetchBy(url, `paginator/${options.page}/${options.limit}`, options).then(
        (data) => resolve(data),
        (error) => reject(error),
      )
    })
  }

  static store(url, options = {}) {
    return new Promise((resolve, reject) => {
      Api.create(url, options.data, { ...options, ...{ alert: false } }).then(
        (data) => resolve(data),
        (error) => reject(error),
      )
    })
  }

  static update(url, options = {}) {
    options.alert = false;
    return new Promise((resolve, reject) => {
      Api.update(url, options.id, options.data, options).then(
        (data) => resolve(data),
        (error) => reject(error),
      )
    })
  }

  static destroy(url, options = {}) {
    return new Promise((resolve, reject) => {
      Api.destroy(url, options.id, { ...options, ...{ alert: false } }).then(
        (data) => resolve(data),
        (error) => reject(error),
      )
    })
  }

  static fetchById(url, options = {}) {
    return new Promise((resolve, reject) => {
      Api.fetchBy(url, options.id, options).then(
        (data) => resolve(data),
        (error) => reject(error),
      )
    })
  }

  static search(url, options = {}) {
    return new Promise((resolve, reject) => {
      Api.fetchBy(`${url}/search`, encodeURIComponent(options.query), options).then(
        (data) => resolve(data),
        (error) => reject(error),
      )
    })
  }

  static format = {};

  static check = {
    label: (label = true) => label && label.length <= 200 && label.trim() !== '',
  }
}

export default Model
