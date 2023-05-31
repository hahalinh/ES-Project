import { useState } from "react";

const Comment = ({setComment, data}) => {
    const handleChange = (e) => {
        const value = e.currentTarget.value;
        setComment(value);
      }
    
      return (
        <div>
          <p>Comment: {data}</p>
          <input className="input-field" onChange={(e) => handleChange(e)} value={data} placeholder="Comment" />
        </div>
      )
}

export default Comment;