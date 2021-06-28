import * as React from "react";

interface Props {
    data: any
    setData: any
}

export function CodeBlockWidget({data, setData}: Props) {
    const onClick = () => {
        setData({code: data.code + '.'});

    }
    return <div style={{color: 'white', backgroundColor: 'gray', padding: '1rem'}}>
        <div>{data.code}</div>
        <div><button onClick={onClick}>Edit</button></div>
    </div>;
}