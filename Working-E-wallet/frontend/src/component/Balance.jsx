
function Balance({value}) {
  return (
    <>
        <div className="h-14 flex items-center">
            <div className="font-bold text-lg">
                Your Balance
            </div>
            <div className="flex font-semibold ml-4">{value}</div>

        </div>
    
    
    </>
  )
}

export default Balance