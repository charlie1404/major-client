const Authorization = (WrappedComponent, allowedRoles) => class WithAuthorization extends React.Component {
    constructor(props) {
      super(props)

      // In this case the user is hardcoded, but it could be loaded from anywhere.
      // Redux, MobX, RxJS, Backbone...
      this.state = {
        user: {
          name: 'vcarl',
          role: 'admin'
        }
      }
    }
    render() {
      const { role } = this.state.user
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />
      } else {
        return <h1>No page for you!</h1>
      }
    }
  }

// Route handler
class YourRoute extends React.Component {
  render() {
    return <div>
      /* the rest of your page */
    </div>
  }
}

export default Authorization(YourRoute, ['manager', 'admin'])

// Router configuration
<Router history={BrowserHistory}>
  <Route path="/" component={App}>
    <Route
      path="feature"
      component={YourRoute}
    />
  </Route>
</Router>
