import React, { useEffect, useState } from 'react'
import DataService from '../../../API/DataService';
import { useFetching } from '../../../hooks/useFetching';
import User from '../User';

const InfoAllUser = () => {
    const [users, setUsers] = useState([])
    
    const [fetchingAllUsers, isLoadingAllUsers, errorAllUsers] =
        useFetching(async () => {
            const response = await DataService.getAllUsers();
            console.log(response.data);
            setUsers(response.data)
            
        });
    
    useEffect(() => {
        fetchingAllUsers();
    }, [])
  return (
    <div className="admin__main">
        <div className="admin__users users-admin">
            {users.map((user, index) => (
                <User user={user}/>
            ))}
        </div>
        
        
        
    </div>
  )
}

export default InfoAllUser