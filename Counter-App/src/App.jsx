import { useState } from "react";

function App(){
  const[count, setCount]=useState(0);

  return(
    <>
    <div>
      <h1>Counter-App</h1>
      <p style={{color:count===0?"red":"white"}}>Count:{count}</p>
      <button onClick={()=>setCount(count+1)}>Increment</button>
      <button onClick={()=>setCount(count-1)} disabled={count===0}>Dcrement</button>
      <button onClick={()=>setCount(0)}>Reset</button>
    </div>
    </>
  )

}
export default App;