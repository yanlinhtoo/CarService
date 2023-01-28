import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deletedUsers } from "./userSlice"
import classes from './UserShow.module.css'

function UserShow(props){

    const dispatch = useDispatch()  

    return (
        <div className="container">
            <div className={classes.component}>
                <div className="row">
                    <div className="col-9">
                        <p>id : {props.id}</p>
                        <p>FullName : {props.fullname}</p>
                        <p>Gmail : {props.email}</p>
                        <p>Password : {props.password}</p>
                        <p>Phone : {props.ph}</p>
                        <p>Role : {props.role}</p>
                        <p>Status : {props.status}</p>
                    </div>
                    <div className="col-3">
                        <div className={classes.btn}>
                            <Link style={{color:'red'}} to={`/user/edit/${props.id}`}>
                                <li className="list-group-item">
                                    <i className="fa fa-edit"> Update User</i>
                                </li>
                            </Link>
                        </div>
                            <a onClick={()=>{dispatch(deletedUsers(props.id)).unwrap()}}>
                                <li className="list-group-item delete">
                                    <i className="fa fa-trash"> Delete User</i>
                                </li>
                            </a>
                        
                       
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserShow