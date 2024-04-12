import axios from 'axios'
import React, { useEffect, useState } from 'react'
import HashLoader from "react-spinners/HashLoader"
import "./Sender.css"
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Sender = () => {

 const [fields, setFields] = useState([{ type: 'text', fieldName: "", fieldValue: '', saveToWeb3: false }])

 const [useOptima, setUseOptima] = useState(false)
 const [result, setResult] = useState(null)
 const [loading, setLoading] = useState(false)
 const [copied, setCopied] = useState(false)

useEffect(() => {

 const updateFields = () => {
  const newData = [
    { type: 'text', fieldName: "Name", fieldValue: 'John Doe', saveToWeb3: true },
    { type: 'number', fieldName: "Age", fieldValue: 25, saveToWeb3: false },
    { type: 'text', fieldName: "Email", fieldValue: 'john.doe@example.com', saveToWeb3: true },
    { type: 'boolean', fieldName: "Active", fieldValue: true, saveToWeb3: false },
    { type: 'date', fieldName: "Birthdate", fieldValue: '1999-01-01', saveToWeb3: true }
  ];

  setFields(newData);
};


 updateFields()
},[])


 const handleSenderFormSubmit = async (event) => {


  for (let i = 0; i < fields.length; i++) {
   if (fields[i].fieldName === '' || fields[i].fieldValue === '') {
    alert('Please fill out all fields')
    return;
   }

   if (!useOptima) {
    fields[i].saveToWeb3 = true
   }
  }

  event.preventDefault()
  console.log('Sender form submitted')
  console.log(fields)
  setLoading(true)
  const response = await axios.post("http://localhost:5000/save", { fields })
  console.log(response.data)
  setResult(response.data)
  setLoading(false)
 }


 const handleCopy = () => {
  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 2000);
};

 const handleChange = (index, event) => {
  const { name, value } = event.target;
  const updatedFields = [...fields];

  if (name === 'saveToWeb3') {
   updatedFields[index][name] = event.target.checked;
   setFields(updatedFields);
   return;
  }
  updatedFields[index][name] = value;
  setFields(updatedFields);

 };

 const handleAddNewField = () => {
  setFields([...fields, { type: 'text', fieldName: "", fieldValue: '', saveToWeb3: false }]);
 }


 console.log(fields);


 return (
  <div className='sender-container'>

   <h2>Sender</h2>

   <div className='toggle-optima'>
    <span>Use Optima</span>
    <label className="switch">
     <input onChange={e => setUseOptima(e.target.checked)} type="checkbox" />
    </label>
   </div>
 
   <form onSubmit={handleSenderFormSubmit}>
    {
     fields.map((field, index) =>
     (
      <div className='field' key={index}>
       <select
        name="type"
        id={`fieldType${index}`}
        value={field.type}
        onChange={(e) => handleChange(index, e)}
       >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
        {/* Add more options as needed */}
       </select>

       <label htmlFor={`fieldName${index}`}>Field Name:</label>
       <input
        type="text"
        name="fieldName"
        id={`fieldName${index}`}
        value={field.fieldName}
        onChange={(e) => handleChange(index, e)}
       />

       <label htmlFor={`fieldValue${index}`}>Field Value:</label>
       <input
        type={field.type}
        name="fieldValue"
        id={`fieldValue${index}`}
        value={field.fieldValue}
        onChange={(e) => handleChange(index, e)}
       />

       {
        useOptima && (
         <>
          <label htmlFor={`saveToWeb3${index}`}>Save to Web3:</label>
          <input
           type="checkbox"
           name="saveToWeb3"
           id={`saveToWeb3${index}`}
           checked={field.saveToWeb3}
           onChange={(e) => handleChange(index, e)}
          />
         </>
        )
       }

       {/* remove field */}
       {fields.length > 1 && <button className='remove-btn' type='button' onClick={() => {
        const updatedFields = fields.filter((field, i) => i !== index);
        setFields(updatedFields);
       }}>Remove</button>}
      </div>
     )
     )
    }

    <button type='button' className='add-field-btn' onClick={handleAddNewField}>Add New Field</button>
    <button disabled={loading} className='submit-btn' type='submit'>{
     loading ? <HashLoader color={"#fff"} loading={loading} size={25} /> : 'Submit'

    }</button>
   </form>

   {result && <div className='result'>
    <h3>Result</h3>
    <p>Transaction time: {result.timeTaken} ms</p>
    <p>Transaction Fee (Gas Fee) : ₹ {result.gasFee}</p>
    <p>Optima Identifier : {result.optimaIdentifier} 
    <CopyToClipboard text={result.optimaIdentifier} onCopy={handleCopy}>
        <button className='copyBtn' type='button'>{copied ? 'Copied!' : 'Copy'}</button>
      </CopyToClipboard>
    </p>
   </div>}

  </div>
 )
}

export default Sender