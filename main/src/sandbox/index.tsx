import GoleryEditor from "../GoleryEditor";
import * as React from "react";
import {useCallback, useMemo, useRef, useState} from "react";
import * as ReactDOM from 'react-dom';
import GoleryEditable from "../core/GoleryEditable";
import EditorToolbar from "../component/toolbar/EditorToolbar";
import "./sandbox.module.scss";
import EditorReadOnly from "../EditorReadOnly";
import {WidgetRenderer, TextNode, RenderMode} from "../core/EditorTypes";
import {getWidgetPlugins} from "./sampleplugins/SamplePlugins";
import {HtmlConversion} from "./HtmlConversion";
import {getStandardPlugins} from "../plugins";


function getSavedTextValue() {
    let parsed: any;
    try {
        const stored = localStorage.getItem('editorValue');
        parsed = JSON.parse(stored);
        if (parsed) return parsed;
    } catch (e) {
    }
}

const SandboxApp = () => {
    const [value, setValue] = useState<TextNode[]>(getSavedTextValue());

    const controllerRef = useRef(null);

    const focus = () => {
        if (controllerRef.current) {
            controllerRef.current?.focus();
        }
    };

    const setValueWrapper = useCallback((v) => {
        setValue(v);
        console.log('Value', v);
        localStorage.setItem('editorValue', JSON.stringify(v));
    }, [setValue],);

    if (window.location.href.indexOf('html') > 0) {
        return <HtmlConversion/>
    }
    return (
        <div style={{margin: "20px"}}>
            <div>
                <button onClick={focus}>Focus to editor</button>
                <button onClick={() => localStorage.clear()}>Reset storage</button>
            </div>
            <div style={{padding: '1rem 0'}}><textarea value={JSON.stringify(value)} rows={5} cols={100}
                                                       onChange={() => {
                                                       }}/></div>

            <hr/>

            <h1>Editor</h1>
            <GoleryEditor controllerRef={controllerRef} value={value} setValue={setValueWrapper}/>

            <hr/>

            <h1>ReadOnly</h1>
            <EditorReadOnly value={value}/>
        </div>
    );
}

ReactDOM.render(<SandboxApp/>, document.getElementById("root"));
