import { expect, test } from '@jest/globals'
import { ShopAntServer } from 'shopant-sdk'

function _newServer() {
  return ShopAntServer({
    productId: 1,
    productSecret: '8a0ae1973760bb4415a194453a701a05',
    url: 'http://localhost:6887/api/v1/integration',
  })
}

test('server ok', () => {
  let server = _newServer()
  return server.call('product.get').then(data => {
    expect(data.id === 1)
    expect(data.packages.length > 0)
  })
})

test('server error', () => {
  let server = _newServer()
  expect(server.call('customer.get')).rejects.not.toBeNull()
  return server.call('customer.get').catch(ex => {
    expect(ex.status !== null && ex.status !== undefined)
    expect(ex.data !== null && ex.data !== undefined)
  })
})
