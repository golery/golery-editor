export type ElementType = string;
export type WidgetData = any;
export interface EditorElement {
    type: string
    data: any
    children: any[]
}

export interface WidgetPlugin {
    id: string;
    elmType: string;
    icon: string;
    name: string;
    getDataWhenInsert: () => Promise<any>;
    render: WidgetRenderer;
}

export enum RenderMode {
    EDIT='EDIT',VIEW='VIEW'
}

export type WidgetRenderer = (params: WidgetRenderParams) => React.ReactNode;

export interface WidgetRenderParams {
    type: ElementType;
    data: WidgetData;
    mode: RenderMode;
    setData?: (WidgetData) => void;
}
