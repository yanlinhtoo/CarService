import { Routes,Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import User from "./components/User";
import UserList from "./components/UserList";
function App() {
  return (
  <div>
      <NavBar/>
      <Routes>
        <Route path='/'>
          <Route path='userList' element={<UserList/>} />
          <Route path='user'>
            <Route path='create' element={<User/>} />
            <Route path='edit/:userId' element={<User mode='edit'/>} />
          </Route>  
        </Route>
      </Routes>
  </div>
  );
}

export default App;
