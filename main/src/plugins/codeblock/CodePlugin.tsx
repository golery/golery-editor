import * as React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";
import {showModal} from "../../component/modal/Modal";
import {CodeEditor} from "./editor/CodeEditor";
import {CodeWidget} from "./view/CodeWidget";

export const CodePlugin: EditorPlugin = {
    id: "code",
    type: "code",
    init() {
    },
    renderEdit({data, setData, attributes, children}: WidgetRenderParams) {
        if (data.type === 'code') return <CodeWidget attributes={attributes} data={data} setData={setData}>{children}</CodeWidget>;
    },
    async onInsert() {
        const code = await showModal({getBody: ({closeModal}) => <CodeEditor code='' onSave={code => closeModal(code)}/>});
        if (code) {
            return ({code});
        }
    }
}