import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId();

  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}

        <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {options?.map((option)=>{
                <option key={option} value={option}>
                    {option}
                </option>
            })}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)


//Select-> dropdown btn

/*
1. options-> dropdown options,
2. label
3. className-> additional
4. ...props -> spreading the props to access it easily
5. label-> conditional rendering
6. select -> will use loop (map) and provide refernce using forwardRef
7. React.forwardRef(Select) -> another way to provide reference
*/