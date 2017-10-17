
export default (store) => ({
  path: 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Route = require('./components/Login').default
      cb(null, Route)
    })
  }
})
