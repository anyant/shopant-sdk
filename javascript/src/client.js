import axios from 'axios'

function ShopAntClient({ path }) {
  const self = {}
  const _state = { promise: null }

  const client = axios.create()

  self.call = function call(method, params) {
    return client.post(path, { method, params }).then(response => {
      let result = response.data
      if (result.status !== 'OK') {
        let ex = new Error(result.status)
        ex.status = result.status
        ex.data = result.data
        throw ex
      }
      return result.data
    })
  }

  function openPaymentView(data, onclose) {
    let el = document.createElement('iframe')
    el.setAttribute('id', 'shopant-payment')
    el.setAttribute('src', data.link)
    el.setAttribute('seamless', true)
    el.setAttribute('frameborder', 0)
    el.setAttribute('scrolling', 'no')
    el.setAttribute('width', window.innerWidth + 'px')
    el.setAttribute('height', window.innerHeight + 'px')
    el.style.position = 'fixed'
    el.style.left = '0'
    el.style.right = '0'
    el.style.top = '0'
    el.style.bottom = '0'
    el.style.zIndex = '9999'
    el.style.border = 'none'

    function closePaymentView() {
      document.body.removeChild(el)
      window.removeEventListener('message', handleMessage)
      if (onclose) {
        onclose()
      }
    }

    function handleMessage(event) {
      if (event.origin === data.origin) {
        if (event.data === 'close') {
          closePaymentView()
        }
      }
    }

    window.addEventListener('message', handleMessage)
    document.body.appendChild(el)
  }

  self.show = function show(data) {
    if (_state.promise) {
      return _state.promise
    }
    let promise = new Promise((resolve, reject) => {
      reject !== null
      openPaymentView(data, () => {
        _state.promise = null
        resolve({ business_order_id: data.business_order_id })
      })
    })
    _state.promise = promise
    return promise
  }

  return self
}

export default ShopAntClient
