import * as React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";

export const ImagePlugin:EditorPlugin = {
    // id: 'image',
    // elmType: 'img',
    // name: 'Image',
    // icon: 'image',
    // async getDataWhenInsert() {
    //     return Promise.resolve({url: 'https://picsum.photos/200/300'});
    // },
    init() {},
    render({type, data}: WidgetRenderParams) {
        if (type === 'img') return <img src={data.src} alt={data.src}/>;
    },
}