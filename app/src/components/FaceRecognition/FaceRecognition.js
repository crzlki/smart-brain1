import React from 'react'
import './index.css'

const FaceRecognition = ({imgURL,box})=>{
return (
    <div className="center ma">
        <div className='absolute mt2'>
        <img src={imgURL} alt="" width='500px' height='auto' id ='inputImage'/>
        <div className="bounding-box" style={{left:box.leftCol,top:box.topRow,bottom:box.bottomRow,right:box.rightCol}}></div>
    </div>
    </div>
)
}
export default FaceRecognition