import * as React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";
import {ModalTemplate, showModal} from "../../component/modal/Modal";
import {CodeEditor} from "./edit/CodeEditor";
import {CodeWidget} from "./view/CodeWidget";

const widgetType = 'code';
export const CodePlugin: EditorPlugin = {
    id: "code",
    type: "code",
    init() {
    },
    renderEdit({data, setData, attributes, children}: WidgetRenderParams) {
        if (data.type !== widgetType) return;
        return <CodeWidget attributes={attributes} data={data} setData={setData} readOnly={false}>{children}</CodeWidget>;
    },
    renderView({data, setData, attributes, children}: WidgetRenderParams) {
        if (data.type !== widgetType) return;
        return <CodeWidget attributes={attributes} data={data} setData={setData} readOnly={true}>{children}</CodeWidget>;
    },
    async onInsert() {
        const code = await showModal({
            getBody: ({closeModal}) => <CodeEditor code='' onSave={code => closeModal(code)}/>,
            template: ModalTemplate.dialog
        });
        if (code) {
            return ({code});
        }
    }
}