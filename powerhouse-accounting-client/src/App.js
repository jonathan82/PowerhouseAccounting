import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AccountList from './components/AccountList'
import Account from './components/Account'
import './App.css';

function App() {
  return (
    <Router>
      <div className="p-3 bg-secondary text-white">
        <span className="fs-4">Powerhouse Accounting</span>
      </div>
      <div className="m-3">
        <Switch>
          <Route path="/account/:accountId?" render={(props) => <Account key={props.match.params.accountId}></Account>}>            
          </Route>
          <Route path="/">
            <AccountList></AccountList>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
