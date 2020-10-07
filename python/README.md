# ShopAnt SDK for Python

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
