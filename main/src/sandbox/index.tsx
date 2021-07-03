import GoleryEditor, {emptyTextValue, TextNode} from "../GoleryEditor";
import {WIDGET_CODE, WidgetConfig} from "../component/widget/Widget";
import * as React from "react";
import {useMemo, useState, useRef, useCallback} from "react";
import * as ReactDOM from 'react-dom';
import {CodeBlockWidget} from "./CodeBlockWidget";
import GoleryEditable from "../GoleryEditable";
import EditorToolbar from "../component/toolbar/EditorToolbar";
import {Descendant} from 'slate';
import "./sandbox.module.scss";

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
    const [value, setValue] = useState<TextNode[]>(emptyTextValue);
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
    }, [setValue],);


    return (
        <div style={{margin: "20px"}}>
            <div>
                <button onClick={focus}>Focus to editor</button>
            </div>
            <div style={{padding: '1rem 0'}}><textarea value={JSON.stringify(value)} rows={5} cols={100}/></div>
            <hr/>

            <GoleryEditor editorRef={editor} value={value} setValue={setValueWrapper}>
                <EditorToolbar widgets={widgets}/>
                <GoleryEditable renderObject={renderObject}/>
            </GoleryEditor>
        </div>
    );
}

ReactDOM.render(<SandboxApp/>, document.getElementById("root"));
