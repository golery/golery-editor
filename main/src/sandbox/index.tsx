import GoleryEditor from "../GoleryEditor";
import * as React from "react";
import {useCallback, useMemo, useRef, useState} from "react";
import * as ReactDOM from 'react-dom';
import GoleryEditable from "../GoleryEditable";
import EditorToolbar from "../component/toolbar/EditorToolbar";
import "./sandbox.module.scss";
import ReadOnlyRender from "../ReadOnlyRender";
import {WidgetRenderer, EditorElement, RenderMode} from "../core/EditorTypes";
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
    const [value, setValue] = useState<EditorElement[]>(getSavedTextValue());

    const widgets = useMemo(() => getWidgetPlugins(), []);
    const plugins = useMemo(() => getStandardPlugins(), []);

    const widgetRender:WidgetRenderer = ({type, data, mode, setData, attributes, children}) => {
        return widgets.find(widget => widget.elmType === type)?.render({
            type, data, mode, setData, attributes, children
        });

    }

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
            <GoleryEditor editorRef={editor} value={value} setValue={setValueWrapper} plugins={plugins}>
                <EditorToolbar widgets={widgets}/>
                <GoleryEditable/>
            </GoleryEditor>

            <hr/>

            <h1>ReadOnly</h1>
            <ReadOnlyRender value={value} customRender={widgetRender}/>
        </div>
    );
}

ReactDOM.render(<SandboxApp/>, document.getElementById("root"));
