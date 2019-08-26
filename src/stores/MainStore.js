
import UserStore from "./UserStore";
import { create } from 'mobx-persist';

const hydrate = create({
	jsonify: true
})

class MainStore {
	userStore = new UserStore(this);

	constructor() {
		hydrate('user', this.userStore);
	}
}

export default MainStore;