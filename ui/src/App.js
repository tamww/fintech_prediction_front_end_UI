import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

/*import word form */
import 'typeface-roboto'
/*import login page layout */
import SignInSide from './pages/loginp/loginp'
/*import user history */
import history from './components/history/history'
/*import layout after login */
import postlogin from './pages/layout/postlogin'
/*import login handler */
import {logintoken, useAuth, logout} from "./components/Auth/userToken"



function App() {
	const [token] = useAuth();
	if(!token) {
	  return <SignInSide />
	}else{
		return (
		<div className="wrapper"> 
		
			<BrowserRouter history = {history}>
				<Switch>
						<Route exact path = "/pp" component = {postlogin}/>
						<Redirect to="/pp" />
				</Switch>
			</BrowserRouter>
		</div>
		);
	};
}
export default App;