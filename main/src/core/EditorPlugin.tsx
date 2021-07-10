import {WidgetRenderer} from "./EditorTypes";

export interface EditorPlugin {
    init: (props: {editor: any, controller: any}) => void;
    render: WidgetRenderer
}