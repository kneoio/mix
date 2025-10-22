import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

export default boot(() => {
  Notify.setDefaults({
    position: 'right',
    progress: true,
    timeout: 2500
  })

  Notify.registerType('app-positive', {
    type: 'positive',
    position: 'right'
  })

  Notify.registerType('app-negative', {
    type: 'negative',
    position: 'right'
  })

  Notify.registerType('app-warning', {
    type: 'warning',
    position: 'right'
  })

  Notify.registerType('app-info', {
    type: 'info',
    position: 'right'
  })
})
