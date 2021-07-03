import GoleryEditor from "../GoleryEditor";
import {WIDGET_CODE} from "../component/widget/Widget";
import * as React from "react";
import {useCallback, useMemo, useRef, useState} from "react";
import * as ReactDOM from 'react-dom';
import {CodeBlockWidget} from "./CodeBlockWidget";
import GoleryEditable from "../GoleryEditable";
import EditorToolbar from "../component/toolbar/EditorToolbar";
import "./sandbox.module.scss";
import ReadOnlyRender from "../ReadOnlyRender";
import {CustomRenderer, EditorElement, WidgetPlugin} from "../core/EditorTypes";

function getWidgetConfigs(): WidgetPlugin[] {
    return [{
        id: WIDGET_CODE,
        elmType: WIDGET_CODE,
        name: 'Code',
        icon: 'code',
        async getDataWhenInsert() {
            return Promise.resolve({code: 'main() {}'});
        },
        renderEditable() {
            return (<div>CodeEditable</div>);
        },
        renderReadOnly() {
            return (<div>CodeReadOnly</div>);
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
    const customRender:CustomRenderer = (type: any, data: any, readOnly: false, setData: any) => {
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
            <div style={{padding: '1rem 0'}}><textarea value={JSON.stringify(value)} rows={5} cols={100}
                                                       onChange={() => {
                                                       }}/></div>

            <hr/>

            <h1>Editor</h1>
            <GoleryEditor editorRef={editor} value={value} setValue={setValueWrapper}>
                <EditorToolbar widgets={widgets}/>
                <GoleryEditable customRender={customRender}/>
            </GoleryEditor>

            <hr/>

            <h1>ReadOnly</h1>
            <ReadOnlyRender value={value} customRender={customRender}/>
        </div>
    );
}

ReactDOM.render(<SandboxApp/>, document.getElementById("root"));
