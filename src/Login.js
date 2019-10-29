import React, { Component } from 'react';
import {Form, Row, Col} from 'react-bootstrap';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}

	render() {
		return(
			<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<Row className="d-flex justify-content-center">
					<Col sm={12}>
						<h1>Login</h1>
						<Form>
						  <Form.Group>
						    <Form.Label column sm="2">
						      Username
						    </Form.Label>
						    <Col sm="10">
						      <Form.Control type="text" defaultValue="" />
						    </Col>
						  </Form.Group>
						  <Form.Group>
						    <Form.Label column sm="2">
						      Password
						    </Form.Label>
						    <Col sm="10">
						      <Form.Control type="password" placeholder="Password" />
						    </Col>
						  </Form.Group>
						</Form>
					</Col>
				</Row>
			</div>
			)
		}
	}

export default Login;