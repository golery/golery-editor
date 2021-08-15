import {EditorPlugin} from "./EditorPlugin";
import React from "react";

export type WidgetData = any;

export interface EditorContext {
    plugins: EditorPlugin[]
}

export interface TextNode {
    type: string
    children: any[]
}

export interface WidgetPlugin {
    id: string;
    elmType: string;
    icon: string;
    name: string;
    getDataWhenInsert: () => Promise<any>;

    init: (props: {editor: any, controller: any}) => void;
    render: WidgetRenderer;
}

export type WidgetRenderer = (params: WidgetRenderParams) => React.ReactElement;

export interface WidgetRenderParams {
    data: WidgetData;
    setData?: (WidgetData) => void;
    attributes?: any
    children?: any
}
