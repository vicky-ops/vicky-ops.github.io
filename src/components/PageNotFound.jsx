import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate=useNavigate();
  return (
    <div
    style={{
      fontFamily: "Roboto",
      height: "100vh",
      top: "-300px",
      // width:"100vw",
      backgroundImage:
        "url(https://in.sugarcosmetics.com/desc-images/404bg.svg)",
      backgroundPosition: "center",
      backgroundSize: "cover",
    }}
  
  >
    <div className='pagenotfound'>
        <button onClick={()=>{navigate(-1)}} style={{marginLeft:"50px",width:"250px",borderRadius:"5px",backgroundColor:"#3e64ff",color:"#ffffff",height:"50px",fontWeight:"bold"}}>Back To Previous Section</button> <span style={{marginLeft:"50px",fontSize:"20px",fontWeight:"bold"}}>- or -</span> 
        <button onClick={()=>{navigate("/")}} style={{marginLeft:"50px",width:"250px",borderRadius:"5px",backgroundColor:"#3e64ff",color:"#ffffff",height:"50px",fontWeight:"bold"}}>Back To Home</button>
    </div>
  </div>
  )
}

export default PageNotFound