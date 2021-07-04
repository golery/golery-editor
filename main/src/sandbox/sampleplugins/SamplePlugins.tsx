import * as React from 'react';
import {WidgetPlugin, WidgetRenderParams} from "../../core/EditorTypes";
import {SampleImageWidget} from "./SampleImageWidget";
import SampleCodeBlockPlugin from "./codeblock";

const plugins = [
    {
        id: 'image',
        elmType: 'image',
        name: 'Image',
        icon: 'image',
        async getDataWhenInsert() {
            return Promise.resolve({url: 'https://picsum.photos/200/300'});
        },
        render(params: WidgetRenderParams) {
            return (<SampleImageWidget data={params.data} setData={params.setData}/>);
        },
    },
    SampleCodeBlockPlugin];

export function getWidgetPlugins(): WidgetPlugin[] {
    return plugins;
}