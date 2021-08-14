import * as React from "react";
import {useRef, useState} from "react";
import * as ReactDOM from "react-dom";

import {GoleryEditor} from 'golery-editor';

const DemoPage = () => {
    const [value, setValue] = useState<EditorElement[]>();
    const controllerRef = useRef<EditorController>();

    return <div>
        <GoleryEditor controllerRef={controllerRef} value={value} setValue={setValue}/>
    </div>
}
ReactDOM.render(<DemoPage/>, document.getElementById("root"));
