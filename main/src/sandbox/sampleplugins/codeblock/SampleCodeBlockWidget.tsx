import * as React from "react";
import {useCallback} from "react";

interface Props {
    data: any
    setData: any
}

export function SampleEditCodeBlock({data, setData}: Props) {
    const onChange = useCallback(
        (e) => {
          const text = e.target.value;
          if (text) {
              setData({code: text});
          }
        },
        [setData],
    );

    return <textarea value={data.code} onChange={onChange}/>;
}

export function SampleCodeBlockWidget({data, setData}: Props) {
    const onClick = () => {
        setData({code: data.code + '.'});

    }
    return <div style={{color: 'white', backgroundColor: 'gray', padding: '1rem'}}>
        <div>{data.code}</div>
        <div><button onClick={onClick}>Edit</button></div>
    </div>;
}