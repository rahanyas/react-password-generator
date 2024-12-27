import { useState, useCallback, useEffect, useRef } from "react"


function App() {
 
const [length , setLength] = useState(8);
const [numberAllowed, setNumberAllowed] = useState(false);
const [charAllowed, setCharAllowed] = useState(false);
const [Password, setPassword] = useState('');

 const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += '!@#$%^&*()_+'

    for(let i = 1; i< length; i++){
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    };

    setPassword(pass);

 }, [length, charAllowed, numberAllowed]);

 useEffect(() => {
     generatePassword();
 }, [length, numberAllowed, charAllowed])

  const copyPass = () => {
    window.navigator.clipboard.writeText(Password)
    passRef.current.select();
    // passRef.current.setSelectionRange(0, 4)
    alert('password copied')
  }

  const passRef = useRef(null)
  return (
    <div className="bg-green-500 w-full h-screen flex flex-col justify-center items-center">
      {/* Heading */}
      <h1 className="text-center text-2xl font-bold uppercase text-white mb-6">
        Generate Random Password
      </h1>
  
      {/* Password Box */}
      <div className="w-96 p-6 bg-gray-700 rounded-md shadow-lg space-y-4">
        {/* Password Input */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={Password}
            placeholder="Password"
            ref={passRef}
            readOnly
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
            onClick={copyPass}
          >
            Copy
          </button>
        </div>
  
        {/* Range Slider */}
        <div className="space-y-2">
          <input
            type="range"
            value={length}
            min={6}
            max={20}
            name="range"
            id="range"
            onChange={(e) => setLength(e.target.value)}
            className="w-full cursor-pointer"
          />
          <label htmlFor="range" className="block text-white">
            Length: <span className="font-bold">{length}</span>
          </label>
        </div>
  
        {/* Checkbox: Allow Numbers */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            name="numberCheckbox"
            id="numberCheckbox"
            className="cursor-pointer"
          />
          <label htmlFor="numberCheckbox" className="text-white">
            Include Numbers
          </label>
        </div>
  
        {/* Checkbox: Allow Characters */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            name="charCheckbox"
            id="charCheckbox"
            className="cursor-pointer"
          />
          <label htmlFor="charCheckbox" className="text-white">
            Include Characters
          </label>
        </div>
      </div>
    </div>
  );
  
}

export default App
