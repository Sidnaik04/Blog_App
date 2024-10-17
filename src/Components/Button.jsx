import React from 'react'

export default function Button({
    children,
    type="button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "", //-> classname is empty because users can have as they want
    ...props //-> spreading the other properties , if extra property than easy to insert
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
      )
}
    

//Button -> dynamic , can be use anywhere depending on use case


 

