import React from 'react'

const GridUserFetcher = ({ onCommit, onRevert }) => {
    const handleChange = e=>{
        console.log(e)
        //e.target.focus()
        onCommit(e.target.value)
        
    }
    return (
        <div>
            <input 
                style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%'
                }}
                //type="number" 
                //max={999999999} 
                autoFocus
                onInput={handleChange}
                //onChange={handleChange} 
                />
        </div>
    )
}

export default GridUserFetcher
