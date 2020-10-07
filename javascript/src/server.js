import axios from 'axios'
import jwt from 'jsonwebtoken'

function ShopAntServer({ productId, productSecret, url }) {
  const self = {}
  if (!url) {
    url = 'https://shop.anyant.com/api/v1/integration'
  }

  const client = axios.create()

  self.inetgration = function inetgration(requestData) {
    if (requestData.params === null || requestData.params === undefined) {
      requestData.params = {}
    }
    requestData.params.product_id = productId
    var requestBody = jwt.sign(requestData, productSecret, {
      algorithm: 'HS256',
      expiresIn: 5 * 60,
    })
    return client.post(url, requestBody).then(response => {
      let result = jwt.verify(response.data, productSecret, {
        algorithms: ['HS256'],
      })
      return result
    })
  }

  self.call = function call(method, params) {
    return self.inetgration({ method, params }).then(result => {
      if (result.status !== 'OK') {
        let ex = new Error(result.status)
        ex.status = result.status
        ex.data = result.data
        throw ex
      }
      return result.data
    })
  }

  return self
}

export default ShopAntServer
