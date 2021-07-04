import * as React from "react";

interface Props {
    data: any
    setData: any
}

export function SampleImageWidget({data, setData}: Props) {
    return <img src={data.url} alt={data.alt}/>;
}