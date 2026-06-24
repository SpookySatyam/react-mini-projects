import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [number, setNumber]=useState(false);
  const [character, setChar]=useState(false)
  const[password, setPassword]=useState("");

  const passwordRef=useRef(null);

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number) str+="0123456789";
    if(character) str+="!@#$%^&*(){}[]~";

    for(let i=1; i<=length; i++){
      let char=Math.floor(Math.random()*str.length);
      pass+=str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character, setPassword])
  
  const copyPassword2Clipboard=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length, number, character, passwordGenerator])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className='w-full  max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700 '>
        <h1 className='text-2xl text-amber-50 text-center mx-2 my-2'> Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-amber-50" >
        <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}/>
          <button 
          onClick={copyPassword2Clipboard}
          className='outline-none bg-blue-700 text-amber-50 px-3 py-0.5 shrink-0 cursor-pointer active:opacity-80'>
            Copy
          </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label htmlFor="">Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={number}
          id='nummberInput'
          className='cursor-pointer'
          onChange={()=>{setNumber((prev)=>!prev)}} />
          <label>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={character}
          id='CharacterInput'
          className='cursor-pointer'
          onChange={()=>{setChar((prev)=>!prev)}} />
          <label>Character</label>
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
