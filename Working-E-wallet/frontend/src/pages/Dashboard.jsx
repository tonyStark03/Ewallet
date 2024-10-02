import { useEffect,useState } from 'react'
import AppBar from '../component/AppBar'
import Balance from '../component/Balance'
import Users from '../component/Users'
import axios from 'axios'

function Dashboard() {
  const [balance, setBalance] = useState(0)
  useEffect( ()=>{
    axios.get("http://localhost:3000/api/v1/account/balance",{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then(response=>{
      setBalance(response.data.balance)
      
    
    },[balance])
  })
  return (
    <>
    <div className='flex flex-col w-full'>
        <div className='mt-1'><AppBar/></div>
        <div className='mt-2 ml-6'><Balance value={balance}/></div>
        <div className='ml-6'><Users/></div>
    </div>
    </>
  )
}

export default Dashboard