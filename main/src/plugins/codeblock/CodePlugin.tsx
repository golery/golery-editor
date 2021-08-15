import * as React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";
import {ModalTemplate, showModal} from "../../component/modal/Modal";
import {CodeEditor} from "./edit/CodeEditor";
import {CodeWidget} from "./view/CodeWidget";
import {CodeElement, TYPE_CODE, TYPE_IMAGE} from "../../core/Schema";

export const CodePlugin: EditorPlugin = {
    id: "code",

    init({editor}) {
        editor.voidElements.push(TYPE_CODE);
    },

    renderEdit({data, setData, attributes, children}: WidgetRenderParams) {
        if (data.type !== TYPE_CODE) return;
        return <CodeWidget attributes={attributes} data={data} setData={setData} readOnly={false}>{children}</CodeWidget>;
    },
    renderView({data, setData, attributes, children}: WidgetRenderParams) {
        if (data.type !== TYPE_CODE) return;
        return <CodeWidget attributes={attributes} data={data} setData={setData} readOnly={true}>{children}</CodeWidget>;
    },

    async onInsert(): Promise<CodeElement> {
        const code: string = await showModal({
            getBody: ({closeModal}) => <CodeEditor code='' onSave={code => closeModal(code)}/>,
            template: ModalTemplate.dialog
        });
        if (code) {
            return ({type: TYPE_CODE, code});
        }
    }
}