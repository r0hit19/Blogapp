import React from "react";
import "./style.css"
import { CreatePost, Navbar } from "../../containers";
import Feed from "../../containers/feed";

export default function Home(){
    return <div className="home">
    <Navbar/>
    <CreatePost/>
    <Feed/>
    </div>;
}