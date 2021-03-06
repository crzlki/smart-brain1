import React from 'react'
import './Signin.css'

class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      signInName:''
    };
  }
  onNameChange = (ev)=>{
    this.setState({ signInName: ev.target.value });
  }
  onEmailChange = (ev) => {
    this.setState({ signInEmail: ev.target.value });
  };
  onPasswordChange = (ev) => {
    this.setState({ signInPassword: ev.target.value })
  };
  onSubmitRegister = () => {
    fetch('https://cryptic-eyrie-07569.herokuapp.com/register',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        email:this.state.signInEmail,
        password: this.state.signInPassword,
        name:this.state.signInName,
        entries:0
      })
    })
    .then(res=>res.json())
    .then(user => {
      if(user.id){
        this.props.loadUser(user)
        this.props.onRouteChange('home')
      }
      
    })
    
  }
  render(){
    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
      <main className="pa4 black-80 center">
      <div className="measure ">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Register</legend>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"
            onChange={this.onNameChange} />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" 
            onChange={this.onEmailChange}/>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" 
            onChange={this.onPasswordChange}/>
          </div>
        </fieldset>
        <div className="">
          <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick = {this.onSubmitRegister} />
        </div>
       
      </div>
    </main>
    </article>
  
    
  )
  }

}
export default Register