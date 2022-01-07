import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {

    const navigate = useNavigate();

    const { state, dispatch } = useContext(UserContext);

    const renderList= () => {
        if(state){
            return [
                <li key="1"><Link to="/profile">Profile</Link></li>,
                <li key="2"><Link to="/createpost">Create Post</Link></li>,
                <li key="3"><Link to="/myfollowingpost">My following posts</Link></li>,
                <li key="4"><button className="btn waves-effect waves-light" onClick={() => {
                    localStorage.clear();
                    dispatch({ type : "CLEAR" });
                    navigate("/signin");
                }}>Log out</button></li>
            ]
        }
        else {
            return [
                <li key="5"><Link to="/signin">Sign in</Link></li>,
                <li key="6"><Link to="/signup">Sign up</Link></li>
            ]
        }
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper white">
                    <Link to={state ? "/" : "/signin"} className="brand-logo">Gallaxy</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {
                            renderList()
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
