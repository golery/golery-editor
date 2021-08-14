import {EditorPlugin} from "./EditorPlugin";
import React from "react";

export type ElementType = string;
export type WidgetData = any;

export interface EditorContext {
    plugins: EditorPlugin[]
}

export interface TextNode {
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

    init: (props: {editor: any, controller: any}) => void;
    render: WidgetRenderer;
}

export enum RenderMode {
    EDIT='EDIT',VIEW='VIEW'
}

export type WidgetRenderer = (params: WidgetRenderParams) => React.ReactElement;

export interface WidgetRenderParams {
    type: ElementType;
    data: WidgetData;
    mode: RenderMode;
    setData?: (WidgetData) => void;
    attributes: any
    children: any
}
