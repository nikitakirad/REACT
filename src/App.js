import React, { Component,lazy,Suspense } from 'react';
import {withRouter,Route,Switch} from 'react-router-dom'
import Blog from './containers/Blog/Blog';
import {connect} from 'react-redux';
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Logout = lazy(()=>import('./containers/Auth/Logout/Logout'));

class App extends Component {
 
  render(){
    let routes=null;
    routes=(
    <Switch>
      <Route path="/login"  render={props => <Auth {...props} />} />
      <Route path="/"  component={Blog} />
    </Switch>);

    if(this.props.isAuthenticated){
      routes=(
      <Switch>
        <Route path="/login"  render={props => <Auth {...props} />} />
        <Route path="/logout" render={() =><Logout/>} />
        <Route path="/"  component={Blog} />
      </Switch>);
    }

    return (
      
      <>
      <Suspense fallback={<p>Loading...</p>}>
        {routes}
      </Suspense>
      </>
      
    );
  
}
}
const mapStateToProps=state=>{
  console.log(state)
  return{
    isAuthenticated:state.token !== null
  }
}
export default withRouter(connect(mapStateToProps)(App));

