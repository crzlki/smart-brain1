import React from 'react'
import './index.css'

const ImageLinkForm = ({onButtonSubmit,onInputChange})=>{
return (
    <div>
        <p className='f3'>
         {'This Magiac will detect faces in your pictures.Give it a try ---'}
        </p>
        <div className='center'>
            <div className='form pa4 br3 shadow-5'>
            <input className='f4 pa2 w-70' type="text"  
            onChange={onInputChange}/>
            <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-yellow'
            onClick={onButtonSubmit}>Detect</button>
            
            </div>
        </div>
    </div>
)
}
export default ImageLinkForm