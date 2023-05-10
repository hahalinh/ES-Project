import React from 'react'
import { useState } from 'react'

function DataTable(props) {
  const [showData, setShowData] = useState(false);
  const stintl = props.stintl;

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
                <th>Stintl ID</th>
                <th>Type</th>
                <th>Island</th>
                <th>Species</th>
                <th>Prey Size Method</th>
                <th>Prey Size Reference</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Observer Location</th>
                <th>Date Time Start</th>
                <th>Date Time End</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stintl.stinStintlID}</td>
                <td>{stintl.Stintl_Type}</td>
                <td>{stintl.Island}</td>
                <td>{stintl.Species}</td>
                <td>{stintl.Prey_Size_Method}</td>
                <td>{stintl.Prey_Size_Reference}</td>
                <td>{stintl.FirstName}</td>
                <td>{stintl.LastName}</td>
                <td>{stintl.Observer_Location}</td>
                <td>{stintl.Date_Time_Start}</td>
                <td>{stintl.Date_Time_End}</td>
              </tr>
            </tbody>
          </table>

        </div>
      )}

      {showData && (
        <div>
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
                <th>Number of Items</th>
                <th>Plot Status</th>
              </tr>
            </thead>
            <tbody>
              {stintl.feedingData?.map((feeding) => (
                <>
                  <tr key={feeding.FeedingID}>
                    <td>{feeding.FeedingID}</td>
                    <td>{feeding.Nest}</td>
                    <td>{feeding.Time_Arrive}</td>
                    <td>{feeding.Time_Depart}</td>
                    <td>{feeding.Provider}</td>
                    <td>{feeding.Recipient}</td>
                    <td>{feeding.Prey_Item}</td>
                    <td>{feeding.Prey_Size}</td>
                    <td>{feeding.Number_of_Items}</td>
                    <td>{feeding.Plot_Status}</td>
                  </tr>
                  <tr>
                    <td colSpan="10"><hr /></td>
                  </tr>

                </>
              ))}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataTable