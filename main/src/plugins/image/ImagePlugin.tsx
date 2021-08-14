import React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";
import {showModal} from "../../component/modal/EditorModal";
import {ImageEditor} from "./editor/ImageEditor";
import {goApi} from "../../core/GoApi";

const widgetType = 'image';
/**
 * Example data:
 *  {
    "type": "image",
    "src": [
      {
        "type": "key",
        "key": "pencil.a0b7b331-d881-4457-a92b-e35667288ccd"
      }
    ],
 * */
interface Node {
    type: 'image';
    src: [{ type: 'key' | 'url', key: string }];
}

function getImageUrl(src: [{ type: 'key' | 'url', key: string }]) {
    if (!src) return;

    const {key} = src[0];
    return goApi.getFileUrl(key);
}
export const ImagePlugin: EditorPlugin = {
    id: 'image',
    type: 'image',

    renderEdit({data, attributes, children}: WidgetRenderParams) {
        const {type, src} = data as Node;
        if (type === widgetType) {
            const url = getImageUrl(src);
            return url ? <div  {...attributes}>{children}<img src={url} alt={url}/></div> : <span/>;
        }
    },

    renderView(data) {
        const {type, src} = data as Node;
        if (type === widgetType) {
            const url = getImageUrl(src);
            return url ? <img src={url}/> : <span/>;
        }
    },

    async onInsert(): Promise<Node> {
        const {key} = await showModal(({closeDialog}) => <ImageEditor closeDialog={closeDialog}/>);
        return {
            type: 'image',
            src: [{type: 'key', key}]
        };
    }
}