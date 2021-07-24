import {WidgetRenderer} from "./EditorTypes";

export interface EditorPlugin {
    id: string
    type: string
    init: (props: {editor: any, controller: any}) => void
    render: WidgetRenderer
    onInsert?: ()=> Promise<any>
}