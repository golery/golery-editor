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
        setTimeout(() => {
            Prism.highlightAll();
        });

    }, []);
    return <pre {...attributes} contentEditable={false}><code className='language-js'>{children}</code></pre>;
}

export const CodePlugin: EditorPlugin = {
    id: "code",
    type: "code",
    init() {
    },
    render({type, data, attributes, children}: WidgetRenderParams) {
        if (type === 'code') return <CodeWidget attributes={attributes}>{children}{data.code}</CodeWidget>;
    },
    onInsert() {
        return new Promise((resolve) => {
            var elem = document.createElement('div');
            document.body.appendChild(elem);
            const onClose = (code) => {
                ReactDOM.unmountComponentAtNode(elem);
                elem.remove();
                if (code)
                resolve(code && {code});
            }
            ReactDOM.render(<EditorModal onCancel={() => onClose(undefined)}><CodeEditor
                onSave={code => onClose(code)}/></EditorModal>, elem);
        })
    }
}