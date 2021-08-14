import * as React from "react";
import {useRef, useState} from "react";
import * as ReactDOM from "react-dom";

import {EditorToolbar, getStandardPlugins, GoleryEditable, GoleryEditor} from 'golery-editor';

const DemoPage = () => {
    const [value, setValue] = useState();
    const controllerRef = useRef(null);

    return <div>
        <GoleryEditor controllerRef={controllerRef} value={value} setValue={setValue}/>
    </div>
}
ReactDOM.render(<DemoPage />, document.getElementById("root"));
