import './App.css';
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import AuthProviders from './Context/AuthProviders';
import {ROUTES} from './constants'
import Login from './components/Login'
import LayoutRoute from './commons/layout/LayoutRoute/index'
const store = configureStore();

function App() {
  const renderRoutes=()=>{
    let xhtml = null;
    xhtml=ROUTES.map((route,index)=>{
        return (<LayoutRoute
                key={index}
                name={route.name}
                component={route.component}
                exact={route.exact}
                path={route.path}
                defaultSelectedKeys={route.defaultSelectedKeys}
                // route={route}
            />)
    })
    return xhtml;
}
  return (
    <Provider store={store}>
    <BrowserRouter>
      <AuthProviders>
          <Switch>
              <Route component={Login} path="/login"/>
              {renderRoutes()}
          </Switch>
      </AuthProviders>
</BrowserRouter>
</Provider>
  );
}

export default App;
