import * as React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";
import "./prism.css";
import Prism from 'prismjs';
import {useEffect} from "react";
import * as ReactDOM from "react-dom";
import {EditorModal} from "../../component/modal/EditorModal";
import {CodeEditor} from "./editor/CodeEditor";

const CodeWidget = ({attributes, children}) => {
    useEffect(() => {
        setTimeout(()=> {
            Prism.highlightAll();
        });

    }, []);
    return <pre {...attributes} contentEditable={false}><code className='language-js'>{children}</code></pre>;
}

export const CodePlugin: EditorPlugin = {
    id: "code",
    init() {},
    render({type, data, attributes, children}: WidgetRenderParams) {
        if (type === 'code') return <CodeWidget attributes={attributes}>{children}{data.code}</CodeWidget>;
    },
    onInsert() {
        var elem = document.createElement('div');
        // FIXME
        elem.id = 'dialog'
        document.body.appendChild(elem);
        ReactDOM.render(<EditorModal><CodeEditor/></EditorModal>, document.getElementById('dialog'));
    }
}