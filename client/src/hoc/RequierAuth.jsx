import React, { useContext } from 'react'
import { Context } from '..';
import { observer } from "mobx-react-lite";
import { Navigate } from 'react-router';

const RequierAuth = ({children}) => {
    const {store} = useContext(Context);
    if(store.isAuth === false){
        return <Navigate to="/auth/login" />
    }
  return (
    <>
        {children}
    </>
  )
}

export default observer(RequierAuth) 