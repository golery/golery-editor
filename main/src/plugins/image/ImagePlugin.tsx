import * as React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";

export const ImagePlugin:EditorPlugin = {
    id: 'image',
    type: 'image',
    // name: 'Image',
    // icon: 'image',
    init() {},
    render({type, data, attributes, children}: WidgetRenderParams) {
        if (type === 'image') return <div  {...attributes}>{children}<img src={data.url} alt={data.url}/></div>;
    },
    async onInsert() {
        return ({url: 'https://picsum.photos/200/300'});
    }
}