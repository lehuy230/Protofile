import React from 'react';
import {Route} from 'react-router-dom';
import DashBoard from '../../../components/Dashboard/index'

function index(props) {
    const {component:YourComponent,...remainProps} = props;
    console.log(props)
    return (
        <Route 
                {...remainProps}
                render={routeProps=>{
                    return (
                        <>
                            <DashBoard  {...remainProps}/> 
                            <YourComponent {...routeProps}/>
                        </>
                       
                    )
                }}
            />
            // <Route
            //     path={route.path}
            //     exact={route.exact}
            //     component={route.component}
            // />
    );
}

export default index;