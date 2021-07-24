import {WidgetRenderer} from "./EditorTypes";
import {ReactEditor} from "slate-react";

export interface EditorPlugin {
    id: string
    type: string
    init: ({editor: ReactEditor, controller: any}) => void
    render: WidgetRenderer
    onInsert?: ()=> Promise<any>
}