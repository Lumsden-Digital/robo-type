import React from 'react'

const Form = ({ inputText, handleChange, typingArea, disableInput, handleSubmit, loading, icon, placeholder, magicLink }) => {
    return (
        <form>
            <div className="flex justify-between my-4">
                <div className="w-10/12">
                    <input
                        value={inputText}
                        onChange={handleChange}
                        ref={typingArea}
                        disabled={disableInput}
                        placeholder={placeholder}
                        className="p-2 border-2 border-gray-400 rounded-lg w-full outline-none"
                    />
                </div>
                {icon === "submit" &&
                    <button
                        className="w-1/5"
                        onClick={handleSubmit}
                    >
                        <div className="text-gray-200 font-body font-semibold bg-gray-700 rounded-full ml-3 py-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-50 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                    </button>    
                }
                {icon === 'magicLink' &&
                    <button
                    className="w-1/5"
                    onClick={handleSubmit}
                >
                    <div className="text-gray-200 font-body font-semibold bg-gray-700 rounded-full ml-3 py-1">
                        { loading ? <span>Loading...</span> :  
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-50 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>}
                    </div>
                </button> 
                }
            </div>
        </form>
    )
}

export default Form
