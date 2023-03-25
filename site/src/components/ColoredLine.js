import React from 'react'
export default function ColoredLine({ color, height, width }) {
    return (<hr
        style={{
            color: color,
            backgroundColor: color,
            height: height,
            width: width
        }}
    />)
}
