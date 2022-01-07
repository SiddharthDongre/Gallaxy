import React, { useState, useEffect } from 'react';
import "./CreatePost.css";
import { useNavigate } from 'react-router-dom';
import M from "materialize-css";

const CreatePost = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        if(url){
            fetch("/createpost", {
                method : "post",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer "+localStorage.getItem("jwt"),
                },
                body : JSON.stringify({
                    title : title,
                    body : body,
                    pic : url
                })
            }).then(res => res.json())
            .then(data => {
                
                if(data.error){
                    M.toast({html: data.error, classes:"#f44336 red"});
                }
                else{
                    M.toast({html : "Created post successfully", classes:"#1de9b6 teal accent-3"});
                    navigate("/");
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }, [url])

    const postDetails = () => {
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
    
    return (
        <>
            <div className="card input-field" style={{margin:"30px auto", maxWidth:"500px", padding:"20px", textAlign:"center"}}>
                <input type="text" placeholder='title' onChange={(e) => setTitle(e.target.value)} value={title} />
                <input type="text" placeholder='body' onChange={(e) => setBody(e.target.value)} value={body} />

                <div className="file-field input-field">
                    <div className="btn">
                        <span>Upload image</span>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>

                <button className="btn waves-effect waves-light" onClick={() => postDetails()}>Submit post</button>

            </div>
        </>
    )
}

export default CreatePost;
