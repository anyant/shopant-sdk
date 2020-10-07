# ShopAnt SDK for Javascript

### Install

```
npm install --save shopant-sdk
```

### Server Integration

```javascript
import { ShopAntServer } from 'shopant-sdk'

let server = ShopAntServer({
  productId: PRODUCT_ID,
  productSecret: PRODUCT_SECRET,
})

const express = require('express')
const app = express()

app.get('/api/v1/shopant/integration', (req, res) => {
  res.send(server.inetgration(req.body))
})
```

### Client Integration

```javascript
import { ShopAntClient } from 'shopant-sdk'

// create client
let client = ShopAntClient({ path: '/api/v1/shopant/inetgration' })

// get product info
let product = await client.call('product.get')

// display product in your app
// ...YOUR CODE...

// start payment
let data = await client.call('payment.start', {
  customer: { external_id: 'YOUR_CUSTOMER_ID' },
  package_amount: package_amount,
  payment_channel_id: payment_channel_id,
})

// show payment view
await client.show(data)

// get customer balance
let customer = client.call('customer.get', {
  customer: { external_id: 'YOUR_CUSTOMER_ID' },
})
console.log(customer)
```
