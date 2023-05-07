import React from 'react';
import { Link } from 'react-router-dom';

const SpiritList =({
 currentuser
}) => {
    console.log(currentuser)

  return (
    <div>
    {!currentuser.barStock.length ? (
     <h3>No Spirits Yet</h3>
     ) : (
      <h1>working</h1>
        // currentuser.map((spirit) => (
        //   <div key={spirit._id} >
        //     <div >
        //         <h1>test</h1>
        //         <h1>
        //             {spirit.name}
        //         </h1>
        //       <p>{spirit.spiritType}</p>
        //     </div>
        //   </div>
        // ))
    )}
    </div>
  );
};

export default SpiritList;
