import React, { useEffect, useState } from "react";

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState([])

  function formSubmit(e) {
    e.preventDefault()
    setList([...list, item])
    setItem("")
  }

  function removeItemFromList(params){
    const operation1 = list.filter((el,index) => el[index] !== el[params])
    console.log(operation1)
    setList(operation1)
  }


  return (
    <>
      <form onSubmit={formSubmit}>
        <input
          onChange={(e) => setItem(e.currentTarget.value)}
          value={item}
          type="text"
        />
        <button type="submit">save</button>
      </form>
      {list.length > 0 && list.map((el,index)=>{
        return (<>
        <div key={index}>{el} <button onClick={() => removeItemFromList(index)}>remove</button></div>
        </>)
      })}
    </>
  );
}

export default App;
