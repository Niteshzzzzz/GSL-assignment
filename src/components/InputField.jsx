import React from 'react'

function InputField({id, label, name, value, onChange, error, type}) {
    return (
        <div className="relative">
            <input type={type} id={id} name={name} value={value} onChange={onChange} placeholder='Marry Doe'></input>
            <p>{error}</p>
            <label htmlFor={id}>{label} <sup>*</sup></label>
        </div>
    )
}

export default InputField