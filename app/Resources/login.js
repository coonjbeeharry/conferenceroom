import React from 'react';
import ReactDOM from 'react-dom';


class Login extends React.Component{
 constructor(props){
super(props);


this.state = {
   username: '',
   password: ''
 
};

this.handleSubmit = this.handleSubmit.bind(this); 
this.handleChange = this.handleChange.bind(this);
this.handleChange1 = this.handleChange1.bind(this);
 }
 
handleChange(e){
  this.setState({
	  username:e.target.value,
  });
}
  handleChange1(e){
	this.setState({
		password:e.target.value,
	});

}
handleSubmit(e) {
	e.preventDefault();
	$.ajax({
		url: 'http://127.0.0.1:8000/api/user',
		type: 'POST',
		data: {
			username: this.state.username,
			password: this.state.password
		},
		dataType: 'json',
		success: function(response) {
			console.log('submit ' + response.success_message);
		}.bind(this),
		error: function(xhr) {
			console.log(`An error occured: ${xhr.status} ${xhr.statusText}`);
		}
});
	
  }

    render() {
        return (
<div >
	<div class="modal-dialog modal-login">
		<div class="modal-content">
			<div class="modal-header">				
				<h4 class="modal-title">Member Login</h4>
			</div>
			<div class="modal-body">
				<form onSubmit={this.handleSubmit} >
					<div class="form-group">
						<i class="fa fa-user"></i>
						<input type="text" onChange={this.handleChange} value={this.state.username} name="username" class="form-control" placeholder="Username" required="required"/>
					</div>
					<div class="form-group">
						<i class="fa fa-lock"></i>
						<input type="password" onChange={this.handleChange1} value={this.state.password} name="password" class="form-control" placeholder="Password" required="required"/>					
					</div>
					<div class="form-group">
						<input type="submit"  class="btn btn-primary btn-block btn-lg" value="Submit" />
					</div>
				</form>				
				
			</div>
			<div class="modal-footer">
				<a href="#">Forgot Password?</a>
			</div>
		</div>
	</div>
</div>     
        )
    }
 

}

ReactDOM.render(<Login/>, document.getElementById('root'));