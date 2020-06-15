import React, { Component,lazy,Suspense } from 'react';
import {withRouter,Route} from 'react-router-dom'
import Blog from './containers/Blog/Blog';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render(){
    let dynamicRoutesArray=null;
    let dynamicRoutes=null;
    dynamicRoutesArray=[
      {path:"/",component:"./containers/Blog/Blog"},
      {path:"/login", component:'./containers/Auth/Auth'},
      {path:"/logout", component:'./containers/Auth/Logout/Logout'},
      {path:"/post/:id", component:'./components/Editpost/Editpost'},
    ];
    dynamicRoutes=dynamicRoutesArray.map(route=>{
      let c=null;
      
      if(route.path==='/' || route.path==='/login'){
        let lazyRoutes=lazy(()=>import(`${route.component}`));
        c=<Route path={route.path} component={lazyRoutes} exact/>}
      else{        
        c=<Route path={route.path} component={Blog} exact />
      }
      return c;
    });
    if(this.props.isAuthenticated){
      dynamicRoutes=dynamicRoutesArray.map(route=>{
        let lazyRoutes=lazy(() => import(`${route.component}`));
        return <Route path={route.path} component={lazyRoutes} exact/>
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


