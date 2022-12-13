import $axios from "../api/http";

export default class ProductsService {
  static async fetchProducts() {
    return $axios.get('/products')
  }

  static async getOne(id) {
    return $axios.get('/products/' + id)
  }

  static async delete(id) {
    return $axios.delete('/products/' + id)
  }

  static async edit(id, product) {
    return $axios.patch('/products/' + id, {
      title: product.title,
      imgUrl: product.imgUrl,
      description: product.description,
      price: product.price
    },
      {
        headers: {
          'Content-type': 'application/json'
        }
      })
  }

  static async create({ title, description, imgUrl, price }) {
    return $axios.post('/products', { title, description, imgUrl, price })
  }
}