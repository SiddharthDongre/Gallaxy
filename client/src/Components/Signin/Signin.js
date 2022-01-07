import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../App";
import M from "materialize-css";

const Signin = () => {

    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const PostData = () => {
        
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalild email", classes:"#f44336 red"});
            return
        }

        fetch("/signin", {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email : email,
                password : password
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"});
            }
            else{
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                dispatch({ type : "USER", payload : data.user  })
                M.toast({html : "signedin success", classes:"#1de9b6 teal accent-3"});
                navigate("/");
            }
        }).catch(err => {
            console.log(err);
        })
    }
     
    return (
        <>
            <div className='mycard'>
                <div className="card auth-card input-field">
                    <h2 className="si-logo">Gallaxy</h2>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='email' />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='password' />
                    <button className="btn waves-effect waves-light" onClick={() => PostData()}>Sign in</button>
                    <h5><Link to="/signup">Dont have an account ?</Link></h5>
                </div>
            </div>
        </>
    )
}

export default Signin;
