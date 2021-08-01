import React, { useContext } from 'react';
import { useState } from 'react';
import { SignInBtn } from '../../components';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebase';
import "./style.css";
import Modal from 'react-modal'
export default function Navbar(){
    const[modalIsOpen,setModalIsOpen]=useState(false)
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
    <div className="Logo-content">
        <h4>Blogspot</h4>
        
        <p onClick={()=>setModalIsOpen(true)}>About</p>
        <p>Documentation</p></div>
        <Modal isOpen={modalIsOpen}
        style={
            {
                overlay:{
                    width:'60%',
                    left:'10%'
                }
            }
        }
        >
         <div className="modalheader">
            <h1>About</h1>
            <button onClick={()=>{setModalIsOpen(false)}}>close</button>
        </div>
        <div className="modalheader">
            This is about
        </div>
        </Modal>
        
        {user? (<div className="navbaruser"><img className="navbar_img" src={user.photoURL}/><h5 className="navbarusername">{user.displayName}</h5></div>):(<SignInBtn/>)}
        
        
    </div>;
}