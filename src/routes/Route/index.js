export default (store) => ({
  path: 'route',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Route = require('./components/Route').default
      cb(null, Route)
    })
  }
})
