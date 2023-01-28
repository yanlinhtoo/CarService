import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import UserShow from "./UserShow";
import { selectAllUsers,getUserStatus,getUserError,fetchUsers } from "./userSlice";

function UserList(){
    const users = useSelector(selectAllUsers)
    const userStatus = useSelector(getUserStatus)
    const error = useSelector(getUserError)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(userStatus === 'idle'){
            dispatch(fetchUsers())
        }
    },[userStatus,dispatch])

    let content;

    if(userStatus === 'loading'){
        content = (<p>Loading...</p>)
    }
    if(userStatus === 'succeeded'){
        content = users.map(e=><UserShow 
            id={e.id}
            fullname={e.fullname}
            email={e.email}
            password={e.password}
            ph={e.ph}
            role={e.role}
            status={e.status}
        />)
    }

    if(userStatus === 'failed'){
        content = (<p>{error}</p>)
    }
    
    return content
}
export default UserList
