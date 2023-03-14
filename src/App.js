import './App.css';
import Nest from './components/Nest';
import NumberItems from './components/NumberItems';
import PreyItem from './components/PreyItem';
import PreySize from './components/PreySize';
import Provider from './components/Provider';
import Recipient from './components/Recipient';
import Timer from './components/Timer';
import axios from 'axios';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import DisplayDemo from './components/DisplayDemo';

function App() {
  const initialFeeding = {
    feedingID: uuid().slice(0, 8),
    nest: 0,
    timeArrive: "",
    timeDepart: "",
    provider: "",
    recipent: "",
    preyItem: "",
    preySize: 0,
    numberItems: 0
  }
  const [feeding, setFeeding] = useState(initialFeeding)

  const [feedings, setFeedings] = useState([]);

  const setNest = (nest) => {
    setFeeding({ ...feeding, nest: nest });
  }

  const setRecipient = (recipent) => {
    setFeeding({ ...feeding, recipent: recipent });
  }

  const setProvider = (provider) => {
    setFeeding({ ...feeding, provider: provider });
  }

  const setPreyItem = (preyItem) => {
    setFeeding({ ...feeding, preyItem: preyItem });
  }

  const setPreySize = (preySize) => {
    setFeeding({ ...feeding, preySize: preySize });
  }

  const setTimeArrive = () => {
    const d = new Date();
    setFeeding({ ...feeding, timeArrive: d.toTimeString().slice(0, 8), timeDepart: "" })
  }

  const setTimeDepart = () => {
    const d = new Date();
    setFeeding({ ...feeding, timeDepart: d.toTimeString().slice(0, 8) })
  }

  const handleNewFeeding = () => {
    const exist = feedings.findIndex(item => item.feedingID === feeding.feedingID);

    if (exist >= 0) {
      let newFeedings = [...feedings];
      newFeedings[exist] = feeding;
      setFeedings(newFeedings);
    }
    else if (exist < 0) {
      setFeedings([...feedings, feeding]);
    }
    setFeeding(initialFeeding);
  }

  const handleOpenFeeding = (e) => {
    //Update current opened feeding
    const curr = feedings.findIndex(item => item.feedingID === feeding.feedingID);
    let uFeedings = [...feedings];
    uFeedings[curr] = feeding;
    setFeedings(uFeedings);

    //Move to another feeding data
    const feedingId = e.currentTarget.value;
    const openF = feedings.find(item => item.feedingID === feedingId);
    setFeeding(openF);
  }

  const handleSaveData = async () => {
    await axios.post("http://localhost:5000", feedings)
      .then((res) => console.log(res.data))
      .catch(err => console.log(err));
  }

  return (
    <>
      <div className="outer-container">
        <div className="menu-container">
          <Timer setArrive={setTimeArrive} setDepart={setTimeDepart} />

          <div>
            <p>Open Feedings:</p>
            {
              feedings.map((item, index) => {
                return (
                  <input key={index} value={item.feedingID} type="button"
                    onClick={(e) => handleOpenFeeding(e)}
                  />
                )
              })
            }
            <button onClick={handleNewFeeding}>New</button>
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

        <button onClick={() => handleSaveData()}>Save feeding datas</button>


        <div>time arrive: {feeding.timeArrive}</div>
        <div>time depart: {feeding.timeDepart}</div>
        <div>nest: {feeding.nest}</div>
        <div>provider: {feeding.provider}</div>
        <div>recipient: {feeding.recipent}</div>
        <div>prey item: {feeding.preyItem}</div>
        <div>prey size: {feeding.preySize}</div>
      </div>

      <DisplayDemo />
    </>
  );
}

export default App;
