import React, { useContext } from 'react';
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebase';
import "./style.css";

export default function Navbar(){
    let emailcheck;
    const [user,setUser]=useContext(UserContext).user
    if (user){
    db.collection('users').where('email','==',user.email).get().then(snapshot=>{
        snapshot.docs.forEach(doc=>{
            emailcheck=(doc.data().email)
        })
        if (emailcheck!==user.email){
            setUser(null);
        }
    })}

    return <div className="navbar">
        <p>Blogspot</p>
        
        {user? (<div className="navbaruser"><img className="navbar_img" src={user.photoURL}/><h5 className="navbarusername">{user.displayName}</h5></div>):(<SignInBtn/>)}
        
        
    </div>;
}