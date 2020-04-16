import React from 'react'
import Tilt from 'react-tilt'
import logo from './logo.png'


const Logo = ()=>{
return (
    <div>
       
        <div className='ma4 mt0'>
        <Tilt className="Tilt" options={{ max : 25 }} style={{ width: '10rem',height:'6rem' }} >
 <div className="Tilt-inner"> 
 <img src={logo} alt='logo' style={{paddingTop:'5px',width: '10rem',height:'6rem'}}/>
  </div>
</Tilt>
        </div>
    </div>
)
}
export default Logo