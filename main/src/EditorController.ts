import {WidgetPlugin} from "./core/EditorTypes";


export interface EditorController {
    getWidgetConfigs(): WidgetPlugin[]
}
