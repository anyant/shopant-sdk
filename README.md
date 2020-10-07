# 蚁小店 - 独立开发者的小商店

假如你做了一个App，收费10元每月，用蚁小店可以解决收款和余额计算问题：
1. 通过 PayJs，虎皮椒等微信服务商，申请支付渠道，拿到接口凭证 AppId 和 密钥，填写到蚁小店后台。
2. 在蚁小店后台创建一个产品，配置购买选项，时长和价格。
3. 在 App 服务端，将一个请求路径代理到蚁小店的 API。
4. 在 App 客户端，调用服务端 API 获取产品和价格信息，展示在页面上。
5. 用户点击下单，调用服务端 API 获取支付链接，通过 SDK 展示支付页面。
6. 用户付款后，支付页面关闭，再调用服务端 API 查询用户余额和账单。

如果再加上兑换码功能：
1. 在蚁小店后台，创建兑换码，设置使用次数，时长等等
2. 在App 客户端，兑换码页面，用户输入兑换码，调用服务端 API 进行兑换。
3. 调用服务端 API 查询用户余额和账单。

如果App可以买断：
1. 配置购买选项时，时长选择为无限即可

如果App是积分制的，例如1元使用某功能一次：
1. 创建产品时，设置类型为积分制。
2. 用户消费时，调用服务端 API 扣减积分。

支持哪些支付渠道：
1. PayJs，虎皮椒等微信服务商
2. 微信，支付宝收款码
3. 比特币，数字货币
4. 其他可以开发的渠道

还有些什么？
1. 蚁小店后台还有用户分析，数据报表等等分析功能
2. 欢迎来聊~

体验一下：
https://rss.preview.anyant.com/

账号：`testvip@anyant.com`  
密码：`vip@1234`  

测试兑换码:
```
test365d
test180d
test90d
```

## SDK for Javascript

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


## SDK for Python

### Install

```
pip install shopant-sdk
```

### Server Integration

```python
from flask import Flask, request, jsonify
from shopan_sdk import ShopAntServer

server = ShopAntServer(PRODUCT_ID, PRODUCT_SECRET)
app = Flask(__name__)

@app.route('/api/v1/shopant/integration', methods=['POST'])
def shopant_integration():
    return jsonify(server.inetgration(request.json()))
```

