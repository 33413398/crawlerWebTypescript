import {HashRouter,Route,Switch} from 'react-router-dom';
import 'antd/dist/antd.css';
import Login from './pages/Login/index'
import Index from './pages/Index/index'
function App() {
  return (
    <div className="App">
      <HashRouter>
        {/* react14 作用是每次只选择一个路由*/}
        <Switch>
          <Route path="/" exact component={Index}/>
          <Route path="/login" exact component={Login}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
