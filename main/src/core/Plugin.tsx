import {WidgetRenderer} from "./EditorTypes";

export interface Plugin {
    init: (props: {editor: any, controller: any}) => void;
    render: WidgetRenderer
}