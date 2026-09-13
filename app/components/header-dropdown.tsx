import Link from "next/link"
interface Props{
 children:string,
 href : string,
 onClick?:React.MouseEventHandler
}
function DropDown({children , href , onClick}:Props) {
  return (
     <>
      <div>
         <Link className="hover:underline p-2 line-clamp-1" href={href} >
         {children}
         </Link> 
      </div>
     </>
  )
}
export default DropDown