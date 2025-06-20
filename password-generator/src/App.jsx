import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*"

    for (let i = 0; i < length; i++) {

      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPassToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-xl mx-auto shadow-md rounded-3xl px-3 py-6 my-20 bg-gray-800 text-gray-500'>
        <h1 className='text-white text-center my-3 text-3xl'>Password Generator</h1>
        <div className='flex shadow rounded-2xl overflow-hidden mb-5 mt-9'>
          <input
            type="text"
            value={password}
            className='outline-none bg-amber-50 w-2xl py-1 px-5'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPassToClip}
            className='outline-none bg-blue-700 text-white px-4 py-3 shrink-0 cursor-pointer hover:bg-blue-600'
          >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className='ml-12 cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='w-20'>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className='ml-8 cursor-pointer'
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              className='ml-8 cursor-pointer'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
