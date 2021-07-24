import {WidgetRenderer} from "./EditorTypes";

export interface EditorPlugin {
    id: string
    init: (props: {editor: any, controller: any}) => void
    render: WidgetRenderer
    onInsert?: ()=>void
}