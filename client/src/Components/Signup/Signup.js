import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from "materialize-css";

const Signup = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState(undefined);

    useEffect(() => {
        if(url){
            uploadFields();
        }
    }, [url]);

    const uploadPic = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "Online")
        data.append("cloud_name", "dnrxxmzfi")
        fetch("https://api.cloudinary.com/v1_1/dnrxxmzfi/image/upload", {
            method : "post",
            body : data
        })
        .then(res => res.json())
        .then(data => {
            setUrl(data.url);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const uploadFields = () => {

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalild email", classes:"#f44336 red"});
            return
        }

        fetch("/signup", {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name : name,
                email : email,
                password : password,
                pic : url
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html: data.error, classes:"#f44336 red"});
            }
            else{
                M.toast({html : data.message, classes:"#1de9b6 teal accent-3"});
                navigate("/signin");
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const PostData = () => {

        if(image){
            uploadPic();
        }
        else {
            uploadFields();
        }
    }

    return (
        <>
            <div className='mycard'>
                <div className="card auth-card input-field">
                    <h2 className="su-logo">Gallaxy</h2>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='name' />
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='email' />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='password' />
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Upload pic</span>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light" onClick={() => PostData()}>Sign up</button>
                    <h5><Link to="/signin">Already have an account ?</Link></h5>
                </div>
            </div>
        </>
    )
}

export default Signup;
