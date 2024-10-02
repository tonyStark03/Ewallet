import { Link } from 'react-router-dom'

export function BottomWarning({linkText,text, to}) {
  return (
    <>
        <div className='text-sm py-2 justify-center'>
            <div>{text}</div>
            <Link className='cursor-pointer underline pl-1' to={to}>{linkText}</Link>
        </div>
    </>
  )
}

