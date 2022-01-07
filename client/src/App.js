import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home/Home';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import Profile from "./Components/Profile/Profile";
import CreatePost from './Components/CreatePost/CreatePost';
import UserProfile from './Components/UserProfile/UserProfile';
import SubscribedUserPost from "./Components/SubscribesUserPost/SubscribesUserPost";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {

  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
      dispatch({ type : "USER", payload : user });
    }
    else{
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route path="/createpost" element={<CreatePost />}></Route>
        <Route path="/profile/:userid" element={<UserProfile />}></Route>
        <Route path="/myfollowingpost" element={<SubscribedUserPost />}></Route>
      </Routes>
    </>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{state, dispatch}}>
        <Router>
          <Navbar />
          <Routing />

        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
