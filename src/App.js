
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from "./components/index";
import { Provider } from 'mobx-react';
import MainStore from "./stores/MainStore";

class App extends Component {

	render() {

		return (
			<Provider rootStore={new MainStore()} >
				<Router>
					<Switch>
						<Route exact path="/" component={Index} />
					</Switch>
				</Router>
			</Provider>
		);
	}
}

export default App;
