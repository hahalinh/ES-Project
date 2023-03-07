import './App.css';
import Nest from './components/Nest';
import NumberItems from './components/NumberItems';
import PreyItem from './components/PreyItem';
import PreySize from './components/PreySize';
import Provider from './components/Provider';
import Recipient from './components/Recipient';
import Timer from './components/Timer';

function App() {
  return (
    <div className="outer-container">
      <div className="menu-container">
        <Timer />

        <div>
          <p>Open Feedings:</p>
        </div>
      </div>

      <div className="stintl-container">
        <div className="box-items">
          <Nest />
          <Recipient />
          <Provider />
        </div>
        <PreyItem />
        <PreySize />
        <NumberItems />
      </div>
    </div>
  );
}

export default App;
