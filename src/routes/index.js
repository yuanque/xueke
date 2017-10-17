// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import register from './Register'
import elapse from './Elapse'
import RouteRoute from './Route'
import PageNotFound from './PageNotFound'
import Redirect from './PageNotFound/redirect'
import course from './Course'
import pinfo from './Pinfo'
import searchresult from './SearchResult'
import video from './Video'
import questiondet from './Questiondet'
import notice from './Notice'
import login from './Login'
import Examination from './Examination'
import Teacher from './Teacher'
/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    Teacher(store),
    Examination(store),
    login(store),
    notice(store),
    questiondet(store),
    video(store),
    pinfo(store),
    course(store),
    register(store),
    searchresult(store),
    elapse(store),
    RouteRoute(store),
    PageNotFound(),
    Redirect
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
