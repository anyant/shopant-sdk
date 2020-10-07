import pytest
from shopant_sdk import ShopAntServer, ShopAntServerError


LOCAL_URL = 'http://localhost:6887/api/v1/integration'


def _new_server():
    return ShopAntServer(1, '8a0ae1973760bb4415a194453a701a05', url=LOCAL_URL)


def test_integration():
    server = _new_server()
    data = server.call('product.get')
    assert data['id'] == 1
    assert data['packages']
    for pkg in data['packages']:
        assert pkg['prices']


def test_server_error():
    server = _new_server()
    with pytest.raises(ShopAntServerError) as ex_info:
        server.call('customer.get')
    assert ex_info.value.status
    assert ex_info.value.data
