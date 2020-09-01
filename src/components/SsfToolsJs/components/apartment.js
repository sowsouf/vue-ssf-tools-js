import Model from "@/app/tools/model";

class Apartment extends Model {
  static tableSingular = '/apartment';
  static table = `/apartment`;

  static __exec(method, options = {}) {
    return Model.__exec('http://localhost:7000/api/layhome', this.table, method, options)
  }

  static mine() {
    return this.__exec('mine')
  }
}

export default Apartment
