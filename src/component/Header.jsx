import React from 'react'
import Title from "../assets/Title.png"
const Header = ({isSearch=false,setSearch}) => {
  return (

        <div className={isSearch?`bg-[#F34D61] w-full p-4 flex justify-between `:`bg-[#F34D61] w-full p-4 flex justify-center align-center `}>
            <img src={Title} alt="Logo" height={"40"} width={"328"} />
            {isSearch && <input type="text" placeholder="Search" className="rounded-lg p-2 w-1/4 bg-amber-50 " onChange={(e)=>{setSearch(e.target.value)}}/>}
        
        </div>
    
  )
}

export default Header