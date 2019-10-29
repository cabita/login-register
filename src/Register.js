import React, { Component } from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';

class Register extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: "",
			email: "",
			fullname: "",
			data: ''
		}
	}

	componentWillMount() {
	    this.getData()
	  }

    getData(data) {
    	var me = this.state;
	    // create a new XMLHttpRequest
	    var xhr = new XMLHttpRequest()

	    // get a callback when the server responds
	    xhr.addEventListener('load', () => {
	      // update the state of the component with the result here
	      console.log(xhr.responseText)
	    })
	    // open the request with the verb and the url
	    xhr.open('POST', 'http://localhost:3000/api/register')
	    // send the request
	    xhr.send(JSON.stringify({data}))
    }

	handleData(key, event) {
		console.log(key);
		console.log(event);
		var obj = {};
		obj[key] = event.target.value;
		this.setState(obj)
		console.log(obj)
	}

	sendData() {
		var me = this.state;

		var data = {
			username: me.username,
			password: me.password,
			email: me.email,
			fullname: me.fullname
		}

		this.getData(data)

	}





	render() {
		var me = this.state;
		return(
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<Row className="d-flex justify-content-center">
					<Col sm={12}>
						<h1>Register</h1>
						<Form>
						  <Form.Group>
						    <Form.Label sm="2">
						      Full Name
						    </Form.Label>
						    <Col sm="10">
						      <Form.Control type = "text" value={me.fullname} onChange={this.handleData.bind(this, 'fullname')} />
						    </Col>
						  </Form.Group>

						  <Form.Group>
						    <Form.Label  sm="2">
						      Email
						    </Form.Label>
						    <Col sm="10">
						      <Form.Control type="email" value = {me.email} onChange={this.handleData.bind(this, 'email')} />
						    </Col>
						  </Form.Group>
						  <Form.Group>
						    <Form.Label  sm="2">
						      Username
						    </Form.Label>
						    <Col sm="10">
						      <Form.Control type="text" name="username" value = {me.username} onChange={this.handleData.bind(this, 'username')} />
						    </Col>
						  </Form.Group>
						  <Form.Group>
						    <Form.Label  sm="2">
						      Password
						    </Form.Label>
						    <Col sm="10">
						      <Form.Control type="password" value = {me.password} onChange={this.handleData.bind(this, 'password')}/>
						    </Col>
						  </Form.Group>
						  <Button onClick={this.sendData.bind(this)}>Enviar</Button>
						</Form>
					</Col>
				</Row>
			</div>
			)
		}
	}


export default Register;