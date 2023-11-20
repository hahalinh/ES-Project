import React from 'react'
import { useState } from 'react'
import '../../App.css'

function DataTable(props) {
  const [showData, setShowData] = useState(false);
  const stint = props.stint;

  const handleShowData = () => {
    setShowData(!showData);
  };

  return (
    <div>
      <button onClick={handleShowData}>
        {showData ? "Hide data" : "Show data"}
      </button>
      {showData && (
        <div>
          <h2>Stint Data</h2>
          <table>
            <thead>
              <tr>
                <th>Stint ID</th>
                <th>Type</th>
                <th>Island</th>
                <th>Species</th>
                <th>Prey Size Method</th>
                <th>Prey Size Reference</th>
                <th>Name</th>
                <th>Observer Location</th>
                <th>Date Time Start</th>
                <th>Date Time End</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stint.StintID}</td>
                <td>{stint.Stint_Type}</td>
                <td>{stint.Island}</td>
                <td>{stint.Species}</td>
                <td>{stint.Prey_Size_Method}</td>
                <td>{stint.Prey_Size_Reference}</td>
                <td>{stint.FirstName}</td>
                <td>{stint.LastName}</td>
                <td>{stint.Observer_Location}</td>
                <td>{stint.Date_Time_Start}</td>
                <td>{stint.Date_Time_End}</td>
              </tr>
            </tbody>
          </table>

          <h2>Feeding Data</h2>

          <table>
            <thead>
              <tr>
                <th>Feeding ID</th>
                <th>Nest</th>
                <th>Time Arrive</th>
                <th>Time Depart</th>
                <th>Provider</th>
                <th>Recipient</th>
                <th>Prey Item</th>
                <th>Prey Size</th>
                <th>Plot Status</th>
              </tr>
            </thead>
            <tbody>
              {stint.feedingData.map((feeding, index) => (
                <React.Fragment key={feeding.FeedingID}>
                  <tr>
                    <td>{feeding.FeedingID}</td>
                    <td>{feeding.Nest}</td>
                    <td>{feeding.Time_Arrive}</td>
                    <td>{feeding.Time_Depart}</td>
                    <td>{feeding.Provider}</td>
                    <td>
                      {feeding.Number_of_Items.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.Recipient}
                          <br />
                        </React.Fragment>
                      ))}
                    </td>
                    <td>
                      {feeding.Number_of_Items.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.Prey_Item}
                          <br />
                        </React.Fragment>
                      ))}
                    </td>
                    <td>
                      {feeding.Number_of_Items.map((item, index) => (
                        <React.Fragment key={index}>
                          {item.Prey_Size}
                          <br />
                        </React.Fragment>
                      ))}
                    </td>
                    <td>{feeding.Plot_Status}</td>
                  </tr>
                  {index < stint.feedingData.length - 1 && (
                    <tr>
                      <td colSpan="9"><hr /></td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataTable;
