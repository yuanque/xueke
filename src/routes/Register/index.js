import { injectReducer } from '../../store/reducers'
import register from './components/register'

export default (store) => ({
  path: 'register',
  /*  Async getComponent is only invoked when route matches   */
   component: register
})
