import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addNewUsers,selectUserById,updateUsers } from "./userSlice";
import { useParams } from "react-router-dom";

function User(props){
    const {userId} = useParams()
    const user = useSelector((state) => selectUserById(state,Number(userId)))
    const id = Number(userId)
    
    const [fullname,setFullName] = useState(user?.fullname)
    const [email,setEmail] = useState(user?.email)
    const [password,setPassword] = useState(user?.password)
    const [ph,setPh]=useState(user?.ph)
    const [role,setRole] = useState(user?.role)
    const [status,setStatus] = useState(user?.status)
    const [addRequestStatus,setAddRequestStatus] = useState('idle')

    const onFullNameInputChange = e => setFullName(e.target.value)
    const onEmailInputChange = e => setEmail(e.target.value)
    const onPasswordInputChange = e => setPassword(e.target.value)
    const onPhInputChange = e => setPh(e.target.value)
    const onRoleInputChange = e => setRole(e.target.value)
    const onStatusInputChange = e => setStatus(e.target.value)
    

    const dispatch = useDispatch()
    const canSave = [fullname,email,password,ph,role,status].every(Boolean) && addRequestStatus === 'idle'
    const isEdit = props.mode === 'edit'

    const onUserSubmit = e =>{
        e.preventDefault()
        if(canSave){
        setAddRequestStatus('pending')
        try{
        dispatch(
            isEdit?updateUsers(
                {
                    id,
                    fullname,
                    email,
                    password,
                    ph,
                    role,
                    status
            }):
            addNewUsers({
            id,
            fullname,
            email,
            password,
            ph,
            role,
            status
    })).unwrap()
}catch(error){
    console.log(error)
}finally{
    setAddRequestStatus('idle')
    setFullName('')
    setEmail('')
    setPassword('')
    setPh('')
    setRole('')
    setStatus('')
}
        }
    }

    return (    
        <form onSubmit={onUserSubmit}>
            <div className="row mx-5 my-4">
                <div className="col-12" >
                    <div className='form-group'>
                        <label for='fullName'>Name :</label>
                        <input 
                            type='text' 
                            className="form-control" 
                            id='fullName'
                            value={fullname}
                            onChange={onFullNameInputChange}
                            />
                    </div> 
                    <div class='form-group'>
                        <label for='email'>Email :</label>
                        <input 
                            type='email' 
                            class="form-control" 
                            id='email'
                            value={email}
                            onChange={onEmailInputChange}  
                            />
                    </div>
                    <div class='form-group'>
                        <label for='password'>Password :</label>
                        <input 
                            type='password' 
                            className='form-control' 
                            id='password'
                            value={password}
                            onChange={onPasswordInputChange}
                            />
                    </div>
                    <div class='form-group'>
                        <label for='ph'>Phone :</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='ph'
                            value={ph}
                            onChange={onPhInputChange}    
                            />
                    </div>
                    <div class='form-group'>
                        <label for='role'>Role :</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='role'
                            value={role}
                            onChange={onRoleInputChange}
                            disabled={isEdit}
                            />
                    </div>
                    <div class='form-group'>
                        <label for='status'>Status :</label>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='status'
                            value={status}
                            onChange={onStatusInputChange}
                            />
                    </div>
                    <input 
                            type="submit" 
                            className="btn btn-primary btn-block mt-4" 
                            value={isEdit?'Update':'Save'}
                            disabled={!canSave}
                            />
                </div>
            </div>
        </form>
      
    );

}
export default User