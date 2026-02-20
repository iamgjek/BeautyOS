import { cancelAllPending } from '../utils/cancelToken.js'
import { getToken, removeToken } from '@/plugins/cookies.js'
import Swal from 'sweetalert2'

export default ({ app }) => {
  const whiteList = ['index']

  app.router.beforeEach((to, from, next) => {

    const merchant = JSON.parse(window.localStorage.getItem('merchant'))
    let isNewCustomer = JSON.parse(window.localStorage.getItem("isNewCustomer")) || false
    let isNewCustomerAndNomerchant =JSON.parse(window.localStorage.getItem("isNewCustomerAndNomerchant")) || false
    
    const token = getToken() || ''

    cancelAllPending()

    if (to.name === 'login') {
      if (isNewCustomer && isNewCustomerAndNomerchant) {
        if (to.name !== 'member-info-edit' && token)  next({ name: 'member-info-edit' })
        else next()
      }
      else if (!merchant && isNewCustomerAndNomerchant ) {
        if (to.name !== 'member-setting-edit' && token) next({ name: 'member-setting-edit' })
        else next()
      }
      else next()
    } else {
      if (to.name !== 'index') {
        if (!token) {
          Swal.fire({
            icon: 'warning',
            iconColor: '#FEB401',
            html: `<h3 class="text-xl">請重新登入。</h3>`,
            showConfirmButton: false,
            timer: 1500
          })
            .then(() => {
              next({ path: '/' })
            })
        }
        else {
          if (isNewCustomer && isNewCustomerAndNomerchant) {
            if (to.name !== 'member-info-edit' && token) next({ name: 'member-info-edit' })
            else next()
          }
          else if (!merchant && isNewCustomerAndNomerchant ) {
            if (to.name !== 'member-setting-edit' && token) next({ name: 'member-setting-edit' })
            else next()
          }
          else next()
        }
      } else {
        if (token) {
          next({ path: '/member' })
        } else {
          next()
        }
      }
    }

  })
}