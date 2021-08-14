import {WidgetRenderer} from "./EditorTypes";
import React from "react";

export interface EditorPlugin {
    id: string
    type: string
    init?: ({editor: ReactEditor, controller: any}) => void
    renderEdit?: WidgetRenderer
    renderView?: WidgetRenderer
    onInsert?: ()=> Promise<any>
}