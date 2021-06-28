import GoleryEditorLib from "../index";
import {EditorContextProvider} from "../EditorContext";
import {WIDGET_CODE, WidgetConfig} from "../components/widget/Widget";
import * as React from "react";
import {useMemo, useState, useRef} from "react";
import * as ReactDOM from 'react-dom';
import {CodeBlockWidget} from "./CodeBlockWidget";

let {GoleryEditor, EditorToolbar, SlateValue} = GoleryEditorLib;

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

const SandboxApp = () => {
    const [text, setText] = useState();
    const renderObject = (setData: any, type: any, data: any) => {
        if (type === 'code') {
            return <CodeBlockWidget data={data} setData={setData}/>
        }
    }
    const input = useRef();
    const widgets = useMemo(() => getWidgetConfigs(), []);

    const editor = useRef();

    const focus = () => {
        if (editor.current) {
           editor.current.focus();
        }
    };

    const getContent = () => {
        setText(editor?.current?.getValue());
    }

    const setContent = () => {
        editor?.current?.setValue(JSON.parse(input.current?.value));
    }

    return (
        <div style={{margin: "20px"}}>
            <EditorContextProvider editorRef={editor}>
                <EditorToolbar widgets={widgets}/>
                <div style={{border: "1px solid red"}}>
                    <GoleryEditor renderObject={renderObject}/>
                </div>
            </EditorContextProvider>

            <div>
                {/*<button onClick={() => this._resetHtml()}>Parse then set Html</button>*/}
                {/*<button onClick={() => this._toogleReadOnly()}>Toogle readonly</button>*/}
                <button onClick={setContent}>Set content</button>
                <button onClick={getContent}>Get content</button>
                <button onClick={focus}>Focus to editor</button>
            </div>

            <textarea ref={input}/>
            <div>Data:
                {text && JSON.stringify(text)}
            </div>
        </div>
    );
}

ReactDOM.render(<SandboxApp/>, document.getElementById("root"));
