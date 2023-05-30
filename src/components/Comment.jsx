import { useState } from "react";

const Comment = ({setComment, data}) => {
    const [input, setInput] = useState("");

    const handleChange = (e) => {
        const value = e.currentTarget.value;
        setInput(value);
        setComment(value);
      }
    
      return (
        <div>
          <p>Comment: {data}</p>
          <input className="input-field" onChange={(e) => handleChange(e)} value={input} placeholder="Comment" />
        </div>
      )
}

export default Comment;