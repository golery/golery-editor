import * as React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";
import "./prism.css";
import Prism from 'prismjs';
import {useEffect} from "react";

const CodeWidget = ({attributes, children}) => {
    useEffect(() => {
        setTimeout(()=> {
            Prism.highlightAll();
        });

    }, []);
    return <pre {...attributes} contentEditable={false}><code className='language-js'>{children}</code></pre>;
}
export const CodePlugin: EditorPlugin = {
    init() {},
    render({type, data, attributes, children}: WidgetRenderParams) {
        if (type === 'code') return <CodeWidget attributes={attributes}>{children}{data.code}</CodeWidget>;
    },
}