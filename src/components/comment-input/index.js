import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user";
import { db } from "../../firebase";
import "./style.css"

export default function CommentInput({comments,id}){

    const [user,setUser]=useContext(UserContext).user;
    const [comment,setComment]=useState("");

    const [commentArray,setCommentArray]=useState(comments ? comments: [] );

    const addComment=()=>{
        //add comment to the post info
            commentArray.push({
                comment:comment,
                username:user.displayName,
            });


            db.collection("posts").doc(id).update({
                comments:commentArray,
            }).then(function(){
                setComment("");
                alert("comment added");
            }).catch(function(error){
                alert(`error: ${error}`);
            })
            
    }

    return <div className="commentinput">
            <textarea
            rows="1" 
            className="commentinputtextarea" 
            placeholder="post your comment"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            >

            </textarea>
            <button onClick={addComment} className="commentinputbutton">post</button>
    </div>
}