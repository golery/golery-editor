import {WidgetRenderer} from "./EditorTypes";
import React from "react";

export interface EditorPlugin {
    id: string
    init?: ({editor: ReactEditor, controller: any}) => void
    renderEdit?: WidgetRenderer
    /** Render for readonly. If not defined, then renderEdit is used */
    renderView?: WidgetRenderer
    onInsert?: () => Promise<any>
}