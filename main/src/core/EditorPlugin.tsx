import {WidgetRenderer} from "./EditorTypes";
import React from "react";

export interface EditorPlugin {
    id: string
    type: string
    init?: ({editor: ReactEditor, controller: any}) => void
    render: WidgetRenderer
    renderView?: (data: any) => React.ReactElement
    onInsert?: ()=> Promise<any>
}