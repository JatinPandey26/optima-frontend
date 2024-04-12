import React, { useState } from 'react'
import HashLoader from "react-spinners/HashLoader"
import "./Receiver.css"
import axios from 'axios'

const Receiver = () => {

 const [result, setResult] = useState()
 const [loading, setLoading] = useState(  )
 const [optimaIdentifier, setOptimaIdentifier] = useState('')

 const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  const response = await axios.get("https://optima-backend-tha0.onrender.com/get/" + optimaIdentifier)
  console.log(response.data)
  setResult(response.data)
  setLoading(false)
 }

 return (
  <div className='receiver-wrapper'>
   <h2>Receiver</h2>
   <div className='receiver-container'>
    <div className='receiver-form'>
     <form onSubmit={handleSubmit}>
      <label>Enter the Optima Identifier  to receive data</label>
      <input type='text' value={optimaIdentifier} onChange={e => setOptimaIdentifier(e.target.value)} placeholder='Optima Identifier' />
      <button type='submit'>
      {loading ? <HashLoader color={"#fff"} loading={loading} size={25} /> : 'Submit'}
      </button>
     </form>
    </div>
    {result && <div className='result'>
     <h3>Result</h3>
     <p>{result && result.map((res,idx) => {
      return <div className='res' key={idx}>
       <p><b>Type</b> : {res.type}</p>
       <p><b>Field Name</b> : {res.fieldName}</p>
       <p><b>Field Value</b> : {res.fieldValue}</p>
       <p><b>Save To Web3</b> : {res.saveToWeb3 ? 'Yes' : 'No'}</p>
      </div>
     })}</p>
    </div>}
   </div>
  </div>
 )
}

export default Receiver