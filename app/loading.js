import React from 'react'

function Loading({ size = 50, color = "rgba(0, 0, 200, 0.87)", borderWidth = 5 }) {
    return (
        <div className='loader-container'>
            <div className='inner-loader' style={{
                width: (size + 'px'),
                height: (size + 'px'),
                borderTopColor: color,
                borderWidth: borderWidth
            }}></div>
        </div>
    )
}

export default Loading