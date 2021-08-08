import {WidgetRenderer} from "./EditorTypes";

export interface EditorPlugin {
    id: string
    type: string
    init: ({editor: ReactEditor, controller: any}) => void
    render: WidgetRenderer
    onInsert?: ()=> Promise<any>
}