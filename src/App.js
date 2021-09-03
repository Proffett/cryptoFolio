import './assets/App.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import MainView from "./components/MainView";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import CoinView from "./components/CoinView";


function App() {


  return (
      <Provider store={store}>
          <BrowserRouter>
              <div className="App">

                  <main className='wrapper'>
                      <Switch>
                          <Route path="/" exact ><MainView/></Route>
                          <Route path='/:coin'><CoinView/></Route>
                      </Switch>
                  </main>
              </div>

          </BrowserRouter>
      </Provider>
  );
}

export default App;
