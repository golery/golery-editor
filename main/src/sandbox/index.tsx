import GoleryEditor from "../GoleryEditor";
import {WIDGET_CODE, WidgetConfig} from "../component/widget/Widget";
import * as React from "react";
import {useCallback, useMemo, useRef, useState} from "react";
import * as ReactDOM from 'react-dom';
import {CodeBlockWidget} from "./CodeBlockWidget";
import GoleryEditable from "../GoleryEditable";
import EditorToolbar from "../component/toolbar/EditorToolbar";
import "./sandbox.module.scss";
import ReadOnlyRender from "../ReadOnlyRender";
import {EditorElement} from "../core/EditorTypes";

function getWidgetConfigs(): WidgetConfig[] {
    return [{
        id: WIDGET_CODE,
        type: WIDGET_CODE,
        name: 'Code',
        icon: 'code',
        async getData() {
            return Promise.resolve({code: 'main() {}'});
        }
    }];
}

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
    const [value, setValue] = useState<EditorElement[]>(getSavedTextValue());
    const renderObject = (setData: any, type: any, data: any) => {
        if (type === 'code') {
            return <CodeBlockWidget data={data} setData={setData}/>
        }
    }

    const widgets = useMemo(() => getWidgetConfigs(), []);

    const editor = useRef(null);

    const focus = () => {
        if (editor.current) {
            editor.current?.focus();
        }
    };

    const setValueWrapper = useCallback((v) => {
        setValue(v);
        console.log('Value', v);
        localStorage.setItem('editorValue', JSON.stringify(v));
    }, [setValue],);


    return (
        <div style={{margin: "20px"}}>
            <div>
                <button onClick={focus}>Focus to editor</button>
                <button onClick={() => localStorage.clear()}>Reset storage</button>
            </div>
            <div style={{padding: '1rem 0'}}><textarea value={JSON.stringify(value)} rows={5} cols={100} onChange={()=>{}}/></div>

            <hr/>

            <h1>Editor</h1>
            <GoleryEditor editorRef={editor} value={value} setValue={setValueWrapper}>
                <EditorToolbar widgets={widgets}/>
                <GoleryEditable renderObject={renderObject}/>
            </GoleryEditor>

            <hr/>

            <h1>ReadOnly</h1>
            <ReadOnlyRender value={value}/>
        </div>
    );
}

ReactDOM.render(<SandboxApp/>, document.getElementById("root"));
