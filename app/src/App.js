import React from 'react';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import './reset.min.css'
import './App.css';
import 'tachyons'

const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '8d906ddfa7a54a4892c7df42657ebf11'
});
const particlesOptions = {
particles: {
  numbers:{
    value:30,
    density: {
      enable:true,
      value_area: 800
    }
  }
}
}
const initialState = {
  input:'',
  imgURL: '',
  box:{},
  route:'signin',
  isSignin:false,
  user:{
   email:'',
   name:'',
   password:'',
   id:'',
   entries:0
  }
}
class App extends React.Component {
constructor(props){
 super(props)
 this.state = initialState
}

loadUser = (user) => {
this.setState({
  user:{...user}
},()=>{
  console.log(this.state.user)
})
}
calculate = (data) => {
const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
const image = document.getElementById('inputImage')
const width = Number(image.width)
const height = Number(image.height)
return {
  leftCol:clarifaiFace.left_col*width,
  topRow:clarifaiFace.top_row*height,
  rightCol:width-(clarifaiFace.right_col*width),
  bottomRow:height-(clarifaiFace.bottom_row*height)
}
}
displayFaceBox = (box) => {
  console.log(box)
 this.setState({
   box
 })
}

onInputChange = (ev) => {
this.setState({
  input:ev.target.value
})
}
onButtonSubmit = () => {
  
this.setState({
  imgURL:this.state.input
},()=>{// callback 
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, this.state.imgURL)
  .then((response)=>{
    this.displayFaceBox(this.calculate(response))
    if(response){
      fetch('https://cryptic-eyrie-07569.herokuapp.com/image',{
        method:'put',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          id: this.state.user.id
        })
      })
      .then(res=>res.json())
      .then(count=>{
        console.log(count)
        this.setState(Object.assign(this.state.user,{entries:count}))
      })
      .catch(err=>console.log)
    }

  }
  )
   .catch((err)=>{
     console.log(err)
   })}
   )
}
onRouteChange = (x) => {
  if(x==='signout'){
    this.setState(initialState)
  }else if(x==='home'){
    this.setState({
      isSignin:true
    })
  }
  this.setState({
    route:x
  })
}
  render(){ 
    return (
      <div className="App">
      <Particles params={particlesOptions} className='particles'></Particles>
     <Navigation onRouteChange={this.onRouteChange} isSignin={this.state.isSignin}></Navigation>
     {this.state.route === 'home'?
     <><Logo></Logo>
     <Rank name={this.state.user.name} entries={this.state.user.entries}></Rank>
     <ImageLinkForm 
     onInputChange={this.onInputChange}
     onButtonSubmit ={this.onButtonSubmit}/>
     <FaceRecognition imgURL={this.state.imgURL} box ={this.state.box}></FaceRecognition></>
     :(this.state.route === 'signin'? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}
     ></Signin>: <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}></Register>)
     }
     
    </div>
    )
 }
}

export default App;
