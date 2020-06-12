import React, { Component,lazy,Suspense } from 'react';
import {withRouter,Route} from 'react-router-dom'
import Blog from './containers/Blog/Blog';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Logout = lazy(()=>import('./containers/Auth/Logout/Logout'));
const Editpost = lazy(()=>import('./components/Editpost/Editpost'));

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render(){
    let dynamicRoutesArray=null;
    let dynamicRoutes=null;
    dynamicRoutesArray=[
      {path:"/",component:Blog},
      {path:"/login", component:Auth},
      {path:"/logout", component:Logout},
      {path:"/post/:id", component:Editpost},
    ];
    dynamicRoutes=dynamicRoutesArray.map(route=>{
      let c=null;
      if(route.path==='/' || route.path==='/login'){
      c=<Route path={route.path} component={route.component} exact/>}
      else{        
        c=<Route path={route.path} component={Blog} exact />
      }
      return c;
    });
    if(this.props.isAuthenticated){
      dynamicRoutes=dynamicRoutesArray.map(route=>{
        return <Route path={route.path} component={route.component} exact/>
    });}
    return (
      
      <>
      <Suspense fallback={<p>Loading...</p>}>
        {dynamicRoutes}
      </Suspense>
      </>
      
    );
  
}
}
const mapStateToProps=state=>{
  return{
    isAuthenticated:state.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );


