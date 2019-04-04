import React from 'react';
import ReactDOM from 'react-dom';
import { id } from 'postcss-selector-parser';


class App extends React.Component {
    constructor(props){
        super(props);
          
        this.state = {
           firstname: '',
           lastname: '',
           email: '',
           password: '',
           confirm_password:'',
           accept: true
        };
        
       this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(e){
        if(e.target.name === 'first_name') {
            this.setState({
               firstname: e.target.value
            });
        }
        if(e.target.name === 'last_name') {
            this.setState({
               lastname: e.target.value
            });
        }
        if(e.target.name === 'email') {
            this.setState({
               email: e.target.value
            });
        
            if(e.target.name === 'password') {
             
                this.setState({
                   password: e.target.value
                });
            }}
            if(e.target.name === 'confirm_password') {
        
                this.setState({
                    confirm_password: e.target.value
                });
            }
        if(e.target.chkbox){
            this.setState({
                active: !this.state.active,
            });
        }


    }

    handleSubmit(e) {
             
  //      if(this.state.password != this.state.confirm_password){
   //         alert('Verify your password again');
   //         e.preventDefault(); 
   //     }else{
            e.preventDefault(); 
        $.ajax({
            url: 'http://127.0.0.1:8000/api/signupuser',
            type: 'POST',
            data: {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.confirm_password
            },
            cache: false,
            dataType: 'json',
            success: function(response) {
                console.log('submit ' + response.success_message);
            }.bind(this),
            error: function(xhr) {
                console.log(`An error occured: ${xhr.status} ${xhr.statusText}`);
            }
        
    });
 //}
      }



  render() {
    return (
        <div>
        <div class="signup-form">
            <form onSubmit={this.handleSubmit} method='POST' >
                <h2>Register</h2>
                <p class="hint-text">Create your account. It's free and only takes a minute.</p>
                <div class="form-group">
                    <div class="row">
                        <div class="col-xs-6"><input onChange={this.handleChange} type="text" class="form-control" name="first_name" placeholder="First Name" required="required"/></div>
                        <div class="col-xs-6"><input onChange={this.handleChange}  type="text" class="form-control" name="last_name" placeholder="Last Name" required="required"/></div>
                    </div>        	
                </div>
                <div class="form-group">
                    <input onChange={this.handleChange} type="email" class="form-control" name="email" placeholder="Email" required="required"/>
                </div>
                <div class="form-group">
                    <input onChange={this.handleChange} type="password" class="form-control" name="password" placeholder="Password" required="required"/>
                </div>
                <div class="form-group">
                    <input onChange={this.handleChange} type="password" class="form-control" name="confirm_password" placeholder="Confirm Password" required="required"/>
                </div>        
                <div class="form-group">
                    <label class="checkbox-inline"><input checked={this.state.active} onChange={this.handleChange} name="chkbox" type="checkbox" required="required"/> I accept the <a href="#">Terms of Use</a></label>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-success btn-lg btn-block">Register Now</button>
                </div>
            </form>
            <div class="text-center">Already have an account? <a href="/login">Sign in</a></div>
        </div>
        </div>    
     
    )
  }
}
ReactDOM.render(<App/>, document.getElementById('root'));

