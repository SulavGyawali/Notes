import React from 'react'

const Alert = (props) => {
  return (
    <div className={`w-full fixed min-h-[6vh] mt-[10vh]  flex justify-center items-center text-black text-2xl ${props.alertType !== "success" ? "bg-red-300" : "bg-green-300"} ${props.alert? "z-10":"-z-10"} `}>
      {props.alertMessage}
    </div>
  )
}

export default Alert
