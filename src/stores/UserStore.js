import { observable, action } from "mobx";
import { persist } from 'mobx-persist';
import { toJS } from 'mobx';

class UserStore {
	@persist('list') @observable listUser = [];

	constructor(rootStore) {
		this.rootStore = rootStore;
	}

	async addUser(user) {
		let result = toJS(this.listUser);

		result.push(user.toLowerCase());

		this.setListUser(result);
	}

	async removeUser(index) {
		let result = toJS(this.listUser);

		result.splice(index, 1);
		this.setListUser(result);
	}

	@action
	setListUser(data) {
		this.listUser = data;
	}

}

export default UserStore;