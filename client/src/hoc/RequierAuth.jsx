import React, { useContext } from 'react'
import { Context } from '..';
import { observer } from "mobx-react-lite";
import { Navigate, useLocation } from 'react-router';

const RequierAuth = ({children}) => {
    const location = useLocation()
    const {store} = useContext(Context);
    if(store.isAuth === false){
        return <Navigate to="/auth/login" state={{from: location}}/>
    }
  return (
    <>
        {children}
    </>
  )
}

export default observer(RequierAuth) 