
export function TextBox({label, placeholder, onChange}) {
  return (
    <>
        <div className='text-sm py-2 font-bold text-left'>
        {label}
        </div>
        <div>
            <input onChange={onChange} className='w-full border rounded border-slate-200 px-2 py-1' placeholder={placeholder}></input>
        </div>
    
    </>
  )
}

