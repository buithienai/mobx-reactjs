import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router-dom';
import { toJS } from 'mobx';
import ico_close from '../public/images/ico_close.png';

@withRouter
@inject('rootStore')
@observer
class IndexComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: '',
			error: false
		}
	}

	handleRemoveUser = (index) => {
		this.setState({
			error: false
		});
		this.props.rootStore.userStore.removeUser(index);
	}

	renderListUser = () => {
		let listUser = toJS(this.props.rootStore.userStore.listUser);
		let html = [];

		listUser.map((item, index) => {
			html.push(
				<li key={index}>
					{item}
					<img
						src={ico_close}
						alt=""
						onClick={() => this.handleRemoveUser(index)}
					/>
				</li>
			);
			return item;
		});

		return html;
	}

	handleAddUser = () => {
		const { user } = this.state;

		if (user.trim().length !== 0) {
			let listUser = toJS(this.props.rootStore.userStore.listUser);

			let index = listUser.indexOf(user.trim().toLowerCase());
			if (index === -1) {
				this.props.rootStore.userStore.addUser(user.trim());
				this.setState({
					user: ''
				});
			} else {
				this.setState({
					error: true
				});
			}
		} else {
			this.setState({
				error: true
			});
		}
	}

	_handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			this.handleAddUser();
		}
	}

	renderError = () => {
		const { user, error } = this.state;

		if (error) {
			let message = 'Name already exists.';
			if (user.trim().length === 0) {
				message = 'Please enter your user.';
			}
			return (
				<div className="error">{message}</div>
			);
		}
	}

	handleChange = (data) => {
		this.setState({
			...data,
			error: false
		});
	}

	render() {
		const { user } = this.state;

		return (
			<div className="root">
				<h2>Demo mobx-react</h2>
				<div className="wrapp">
					<input
						type="text"
						value={user}
						onChange={(e) => this.handleChange({ user: e.target.value })}
						onKeyDown={this._handleKeyDown}
					/>
					<button onClick={this.handleAddUser}>Add user</button>
				</div>
				{this.renderError()}
				<ul>
					{this.renderListUser()}
				</ul>
			</div>
		);
	}
}

export default IndexComponent;
