import {useState, useEffect} from 'react'
import { Button } from './Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Users() {

const [users, setUsers] = useState([])
const [filter, setFilter] = useState("")

useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
    .then(Response=>{
        setUsers(Response.data.users)
    })
},[filter])
  return (
    <>
        <div className='text-lg font-bold'>
            Users
        </div>
        <div className='my-2'>
            <input onChange={e=>{
                setFilter(e.target.value)
            }} className='border ml-4 rounded border-slate-200 px-2 py-1 w-full' type='text' placeholder='Search users...'></input>
        </div>
        <div className=''>
            {users.map(user => <User key={user.id} user={user}/>)}
        </div>
    </>
  )
}


function User({user}) {
    const Navigate = useNavigate();
    const firstLetter = user.firstname ? user.firstname[0].toUpperCase() : ''; 
       return (
        <div className="flex justify-between ml-4">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {firstLetter}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <div>
                        {user.firstname} {user.lastname}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-ful">
                <Button onClick={()=>{
                    Navigate("/send?id="+user.id+"&name="+user.firstname)
                }} label={"Send Money"} />
            </div>
        </div>
    );
}


export default Users