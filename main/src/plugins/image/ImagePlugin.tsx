import React from "react";
import {EditorPlugin} from "../../core/EditorPlugin";
import {showModal} from "../../component/modal/Modal";
import {ImageEditor} from "./edit/ImageEditor";
import {goApi} from "../../core/GoApi";
import {ImageView} from "./view/ImageView";

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

    renderEdit({data, attributes, children}) {
        const {type, src} = data as Node;
        if (type === widgetType) {
            const url = getImageUrl(src);
            return url ? <div  {...attributes}>{children}<img src={url} alt={url}/></div> : <span/>;
        }
    },

    renderView({data, attributes}) {
        const {type, src} = data as Node;
        if (type === widgetType) {
            const url = getImageUrl(src);
            return <ImageView url={url} {...(attributes || {})}/>;
        }
    },

    async onInsert(): Promise<Node> {
        const {key} = await showModal({getBody: ({closeModal}) => <ImageEditor closeDialog={closeModal}/>});
        return {
            type: 'image',
            src: [{type: 'key', key}]
        };
    }
}