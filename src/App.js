import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="outer-container">
      <div className="menu-container">
        <div className="time-button">
          <button className="time-start">Time Stamp - Start</button>
          <button className="time-end">Time Stamp - End</button>
        </div>

        <div>
          <p>Open Feedings:</p>
        </div>
      </div>

      <div className="stintl-container">
        <div className="box-items">
          <div className="nest">
            <p>Nest</p>
            <div className="nest-bt">
              <button>P1</button>
              <button>P2</button>
            </div>
          </div>
          <div className="recipient">
            <p>Recipient</p>
            <div className="recipient-bt">
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>A1</button>
            </div>
          </div>
          <div className="provider">
            <p>Provider</p>
            <div className="provider-bt">
              <button>P1</button>
              <button>P2</button>
            </div>
          </div>
        </div>
        <div className="prey-item">
          <p>Prey Item</p>
          <div className="prey-item-bt">
            <button>H</button>
            <button>HR</button>
            <button>R</button>
            <button>T</button>
          </div>
        </div>
        <div className="prey-size">
          <p>Prey Size</p>
          <div className="prey-size-bt">
            <button>1.00</button>
            <button>1.25</button>
            <button>1.5</button>
          </div>
        </div>
        <div className="number-items">
          <p>Number of Items</p>
          
        </div>
      </div>
    </div>
  );
}

export default App;
