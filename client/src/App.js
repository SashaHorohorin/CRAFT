import './App.css';
import Marquee from './components/Marquee/Marquee';
import HomePage from './page/HomePage/HomePage';


function App() {
  return (
    <div className="App">
      <HomePage/>
      <Marquee classAdd='marquee-first' text='Тренировки по уровням'/>
    </div>
  );
}

export default App;
