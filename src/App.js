import React,  { useEffect, useRef, useState } from "react";
import Editor from './components/editor';
import "antd/dist/antd.min.css"
import "./assets/custom.css"



function App(props){
   
   return(
       <div style={{width:'80%', margin:'auto', marginTop:'20px'}}>
       <Editor/>
       </div>
   )
   
}
export default App;