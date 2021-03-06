import React, { useContext, useState } from 'react';
import "./style.css";
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/user';
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto"
import { db, storage } from '../../firebase';
import makeid from '../../helper/function';
import firebase from "firebase";


export default function CreatePost(){
    const [user,setUser]=useContext(UserContext).user;
    const [caption,setCaption]=useState("");
    const [image,setImage]=useState("");
    const [progress, setProgress]=useState(0);
    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            var selectedImageSrc=URL.createObjectURL(e.target.files[0]);
            var imagePreview=document.getElementById("image-preview");
            imagePreview.src=selectedImageSrc;
            imagePreview.style.display="block";        }
    }

    const handleUpload=()=>{
        if(image || !image){
            var imageName=makeid(10);
            const uploadTask=storage.ref(`images/${imageName}.jpg`).put(image);
            uploadTask.on("state_Changed",(snapshot)=>{
                //progress function 
                const progress=Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProgress(progress);
            },(error)=>{console.log(error);},()=>{
                //get the download URL and upload the post
                storage.ref('images').child(`${imageName}.jpg`).getDownloadURL().then((imageUrl)=>{
                    db.collection('posts').add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        photoUrl:imageUrl,
                        username:user.displayName?user.displayName:user.email.replace("@gmail.com",""),
                        profileUrl:user.photoURL,
                        email:user.email
                    })
                })
                setCaption("");
                setProgress(0);
                setImage(null);
                document.getElementById("image-preview").style.display="none";
            })
        }
    }

    return <div className="createpost">
            {user?(
                <div className="post">
                    <p>Create your post</p>
                    <div className="postcontent">
                        <textarea placeholder="enter your caption here"
                        required className="postcaption" rows="3" value={caption} onChange={(e)=>setCaption(e.target.value)}>
                        </textarea>
                        <div className="postpreviewimage">
                        <img id="image-preview" alt=" "/>
                        </div>
                    </div>
                    <div className="postbottom">
                    <div className="postimageupload">
                        <label htmlFor="fileInput"><AddAPhotoIcon style={{cursor:"pointer",fontSize:"20px"}}/> </label>
                        <input id="fileInput" type="file" accept="image/*" onChange={handleChange}/>  
                    </div>
                    <div className="btn">
                    <button className="uploadbtn" onClick={handleUpload} style={{color:caption? "black":"lightgray",backgroundColor:caption? "lightcyan":"black "}}>
                    {`upload ${progress !=0 ? progress : ""}`}</button>
                </div>
                </div>
                </div>
                ):(<div>
                <SignInBtn/>
            <p> to post something and comment </p>
            </div>)}
            
    </div>;
} 