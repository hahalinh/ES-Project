// import React, { useState } from 'react';
// import Button from '../Button';

// function Nest({ setNest, data }) {
//   const [nests, setNests] = useState(["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"]);
  
//   // const handleSelectChange = (event) => {
//   //   setNest(event.target.value);
//   // };

//   return (
//     <div className="nest">
//       <p>Nest: {data}</p>
//       <div className="nest-bt">
//         {nests.map((item, index) => (
//           <Button
//             handleData={setNest}
//             value={item}
//             key={index}
//             selected={item === data}
//           />
//         ))}
//         <Button handleData={setNest} value="" />

//         {/* <select className="dropdown" value={data} onChange={handleSelectChange}>
//           {dropdownValues.map((item, index) => (
//             <option key={index} value={item}>{item}</option>
//           ))}
//         </select> */}

//       </div>
//     </div>
//   );
// }

// export default Nest;


import React, { useState } from 'react';
import Button from '../Button';

function Nest({ setNest, data }) {
  const [nests, setNests] = useState(["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"]);
  const dropdownValues = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

  return (
    <div className="nest">
      <p>Nest: {data}</p>
      <div className="nest-bt">
        {nests.map((item, index) => (
          <Button
            handleData={setNest}
            value={item}
            key={index}
            selected={item === data}
          />
        ))}
        <Button handleData={setNest} value="" />
        <Button handleData={setNest} value="drop-down" dropdownValues={dropdownValues} />

      </div>
    </div>
  );
}

export default Nest;
