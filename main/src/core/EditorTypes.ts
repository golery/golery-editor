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
    renderEditable: () => React.ReactNode;
    renderReadOnly: () => React.ReactNode;
}

export type CustomRenderer = (type: string, data: any, readOnly: boolean, setData: (any) => void) => React.ReactNode;