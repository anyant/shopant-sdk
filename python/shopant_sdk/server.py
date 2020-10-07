import time
import jwt
import requests


DEFAULT_ALGORITHM = 'HS256'
DEFAULT_URL = 'https://shop.anyant.com/api/v1/integration'


class ShopAntServerError(Exception):
    def __init__(self, status: str, data: object = None):
        self.status = status
        self.data = data


class ShopAntServer:
    def __init__(self, product_id: int, product_secret: str, *, url: str = None):
        if not url:
            url = DEFAULT_URL
        self.url = url
        self.product_id = product_id
        self.product_secret = product_secret
        self.algorithm = DEFAULT_ALGORITHM

    def _encode(self, payload, expiration: int) -> str:
        headers = dict(exp=int(time.time()) + expiration)
        payload = jwt.encode(
            payload, self.product_secret,
            algorithm=self.algorithm,
            headers=headers,
        )
        return payload.decode('ascii')

    def _decode(self, payload):
        options = {'require': ['exp']}
        return jwt.decode(
            payload, self.product_secret,
            options=options,
            algorithms=[self.algorithm],
        )

    def integration(self, request_data: dict) -> dict:
        if request_data.get('params') is None:
            request_data['params'] = {}
        request_data['params']['product_id'] = self.product_id
        payload = self._encode(request_data, expiration=5 * 60)
        response = requests.post(self.url, payload)
        response.raise_for_status()
        return self._decode(response.text)

    def call(self, method: str, params: dict = None) -> dict:
        request_data = dict(method=method, params=params)
        result = self.integration(request_data)
        if result['status'] != 'OK':
            raise ShopAntServerError(result['status'], data=result['data'])
        return result['data']
