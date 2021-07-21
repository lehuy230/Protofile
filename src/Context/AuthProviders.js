import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';

export const AuthContext  = React.createContext();


function AuthProviders({children}) {
    const [user,setUser] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const history = useHistory();
    const pathName = history.location.pathname;
    React.useEffect(()=>{
        const unsubscibe =auth.onAuthStateChanged((user)=>{
            if(user){
                console.log(user)
                const {displayName,email,uid,photoURL} = user;
                setUser({displayName,email,uid,photoURL});
                setIsLoading(false);
                history.push(pathName==="/login"?"/":pathName);
                return;
            }
            setIsLoading(false);
            history.push("/login");
           
        })

        return ()=>{
            unsubscibe();
        }
    },[history])
    
    return (
        <AuthContext.Provider value={{user}}>
            {isLoading?<Spin/>: children}
        </AuthContext.Provider>
            
    );
}

export default AuthProviders;