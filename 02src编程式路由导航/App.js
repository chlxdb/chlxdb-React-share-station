
// import { Row, Col } from 'antd';
// import 'antd/dist/antd.css'
import Home from './components/pages/home'
import About from './components/pages/about'
import { Link, Redirect, Route } from 'react-router-dom'
function App() {
  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header"><h2>React Router Demo</h2></div>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* 原生html靠a标签实现路由跳转 */}
            {/* <a className="list-group-item" href="./about.html">About</a>
        <a className="list-group-item active" href="./home.html">Home</a> */}


            {/* 在react中靠路有链接实现 */}

            <Link className="list-group-item" to="/about">about</Link>
            <Link className="list-group-item" to="/home">home</Link>


          </div>

        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">



              {/* 注册路由 */}

              <Route path="/about" component={About} />
              <Route path="/home" component={Home} />
              <Redirect to="/home" />





            </div>
          </div>
        </div>
      </div>



    </div>

  )
}
export default App;
