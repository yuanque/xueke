// import { injectReducer } from '../../store/reducers'
import Teacher from './components/Teacher'

export default (store) => ({
  path: 'Teacher',
  /*  Async getComponent is only invoked when route matches   */
  component: Teacher
})
