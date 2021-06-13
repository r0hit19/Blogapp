import React, { useContext, useState } from "react";
import { Comment, CommentInput } from "../../components";
import { UserContext } from "../../contexts/user";
import { db, storage } from "../../firebase";
import Modal from 'react-modal';

import "./style.css";

export default function Post({profileUrl,username,id,photoURL,caption,comments,email,timestamp}){

    const[user,setUser]=useContext(UserContext).user;
    const[modalIsOpen,setModalIsOpen]=useState(false)
    const deletePost=()=>{
        
        //delete the image from the firebase storage
        //get ref to the image file 
        var imageRef=storage.refFromURL(photoURL);
        
        //delete the file

        imageRef.delete().then(function(){
            alert("deleted successfully");
        }).catch(function(error){alert(`Error: ${error}`)})

        //delete the post info from firebase firestore

        db.collection('posts').doc(id).delete().then(function(){
            alert("Post deleted successfully");
        }).catch(function(error){alert(`Error: ${error}`)})
        
    
    }

    return <div className="post">
        <div className="postheader">
        <div className="postheadercontent">
        <img className="postheadercontentprofilepic" src={profileUrl}/>
            <p>{username}</p>
        </div>
        {user!==null && user.email==email? <button id="delete-btn" onClick={deletePost} className="postdeletebtn" >Delete</button>:<></>}
       
           
        </div>
        <div className="postmaincontent">
        <div>
        <p style={{marginTop:"10px"}}>
            <span style={{fontWeight:"500",marginRight:"8px"}}>{username} <span style={{fontWeight:"400",fontSize:"12px"}}>(author)</span> :</span>
            <p style={{color:"maroon",backgroundColor:"white", padding:"5px 10px",marginTop:"10px"}}>"{caption}"</p>
        </p>
        </div>
             <img className="postmaincontentimage" src={photoURL} alt=""/>
        </div>
        <div>
            <button onClick={()=>setModalIsOpen(true)}>see comments</button>
        </div>
        <Modal isOpen={modalIsOpen}
        style={
            {
                overlay:{
                    width:'30%',
                    top:'10%',
                    left:'70%'
                }
            }
        }
        >
        <div className="modalheader">
            <h1>Comments</h1>
            <button onClick={()=>{setModalIsOpen(false)}}>close</button>
        </div>
        <div className="modalbody">
            
        {comments ? ( comments.map((comment)=>(
            <Comment username={comment.username} caption={comment.comment} email={comment.email}/>
        ))):(<></>)}
        </div>
        </Modal>
       
        {user?<CommentInput comments={comments} id={id}/>:<></>}
    </div>;
}