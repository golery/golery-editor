import * as React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";
import * as ReactDOM from "react-dom";
import {EditorModal, showModal} from "../../component/modal/EditorModal";
import {CodeEditor} from "./editor/CodeEditor";
import {CodeWidget} from "./view/CodeWidget";

export const CodePlugin: EditorPlugin = {
    id: "code",
    type: "code",
    init() {
    },
    render({type, data, setData, attributes, children}: WidgetRenderParams) {
        if (type === 'code') return <CodeWidget attributes={attributes} data={data} setData={setData}>{children}</CodeWidget>;
    },
    async onInsert() {
        const code = await showModal(({closeDialog}) => <CodeEditor onSave={code => closeDialog(code)}/>);
        if (code) {
            return ({code});
        }
    }
}