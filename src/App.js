import './App.css';
import Nest from './components/Nest';
import NumberItems from './components/NumberItems';
import PreyItem from './components/PreyItem';
import PreySize from './components/PreySize';
import Provider from './components/Provider';
import Recipient from './components/Recipient';
import Timer from './components/Timer';
import { useState } from 'react';

function App() {
  const [feeding, setFeeding] = useState({
    feedingID: 1,
    nest: 2,
    timeArrive: "15:30",
    timeDepart: "15:31",
    provider: "S",
    recipent: "S",
    preyItem: "K",
    preySize: 1.75,
    numberItems: 1
  })

  const setNest = (nest) => {
    setFeeding({...feeding, nest: nest});
  }
  
  const setRecipient = (recipent) => {
    setFeeding({...feeding, recipent: recipent});
  }

  const setProvider = (provider) => {
    setFeeding({...feeding, provider: provider});
  }

  const setPreyItem = (preyItem) => {
    setFeeding({...feeding, preyItem: preyItem});
  }

  const setPreySize = (preySize) => {
    setFeeding({...feeding, preySize: preySize});
  }

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
          <Nest setNest={setNest} />
          <Recipient setRecipient={setRecipient} />
          <Provider setProvider={setProvider} />
        </div>
        <PreyItem setPreyItem={setPreyItem} />
        <PreySize setPreySize={setPreySize} />
        <NumberItems />
      </div>

      <div>{feeding.nest}</div>
      <div>{feeding.provider}</div>
      <div>{feeding.recipent}</div>
      <div>{feeding.preyItem}</div>
      <div>{feeding.preySize}</div>
    </div>
  );
}

export default App;
