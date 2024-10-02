import { useSearchParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react"
import { Button } from "../component/Button"
import { useNavigate } from "react-router-dom"

function SendMoney()  {
  const Navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const name = searchParams.get("name");
 const id = searchParams.get("id");
 const [amount, setAmount] = useState(0);
 const [response, setResponse] = useState(null)
 return <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
          <div
              className="border h-min text-card-foreground max-w-md p-4 space-y-8  w-96 bg-white shadow-lg rounded-lg"
          >
              <div className="flex flex-col space-y-1.5 px-6">
              <h2 className="text-3xl font-bold text-center">Send Money</h2>
              </div>
              <div className=" ">
              <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                  </div>
                  <h3 className="text-2xl font-semibold">{name}</h3>
              </div>
              <div className="space-y-4">
                  <div className="space-y-2">
                  <div
                      className="mb-6">
                      Amount (in Rs)
                  </div>
                  <input
                      onChange={(e)=>{
                        setAmount(e.target.value)
                      }}
                      type="number"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      id="amount"
                      placeholder="Enter amount"
                  />
                  </div>
                  <button onClick={async() => {
                    try{

                      const message = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                        to: id,
                        amount
                      }, {
                        headers: {
                          Authorization: "Bearer " + localStorage.getItem("token")
                        }
                      })
                      setResponse(message.data.message)
                    }catch(e){
                      setResponse("Error while transferring money")
                    }
                        
                       

                    }} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                    {response && <div className="flex justify-center">{response}</div>}
              </div>
              </div>
              <div>
                {response && <Button onClick={()=>{
                  Navigate("/Dashboard")
                }} label={"Check Balance"}></Button>}
              </div>
      </div>
    </div>
  </div>
}
export default SendMoney