import { Link } from "react-router-dom"
import classes from './NavBar.module.css'

function NavBar(){
    return(
        <div className={classes.header}>
            <div className={classes.logo}> 
                Logo
            </div>
            <div className={classes.tab}>
                <Link style={{textDecoration: 'none',color:'white'}}  to='/user/create'>
                    UserForm
                </Link>              
            </div>
                <Link style={{textDecoration: 'none',color:'white'}}  to='/userList'>
                    Dashboard
                </Link>              
        </div>
        );
    }
export default NavBar