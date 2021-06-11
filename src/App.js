
import './App.css';
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'



function App() {
  return (
    <div className="App">
      
      <div className="appHeader">
        <Header/>
      </div>
     
      
      <div className="appHome">
        <Home/>
      </div>
    </div>
  );
}

export default App;
