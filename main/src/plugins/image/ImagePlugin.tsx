import React from "react";
import {EditorPlugin} from "../../core/EditorPlugin";
import {ModalTemplate, showModal} from "../../component/modal/Modal";
import {ImageEditor} from "./edit/editor/ImageEditor";
import {goApi} from "../../core/GoApi";
import {ImageView} from "./view/ImageView";
import {TYPE_IMAGE, ImageElement} from "../../core/Schema";
import {ImageEdit} from "./edit/ImageEdit";

function getImageUrl(src: [{ url?: string, key?: string }]) {
    if (!src) return;
    const {key, url} = src[0];
    if (url) return url;
    return goApi.getFileUrl(key);
}

export const ImagePlugin: EditorPlugin = {
    id: 'image',

    init({editor}) {
        editor.voidElements.push(TYPE_IMAGE);
    },

    renderEdit({data, attributes, children}) {
        const {type, src} = data as ImageElement;
        if (type === TYPE_IMAGE) {
            const url = getImageUrl(src);
            return url ? <div  {...attributes}><ImageEdit url={url}/>{children}</div> : <span/>;
        }
    },

    renderView({data, attributes}) {
        const {type, src} = data as ImageElement;
        if (type === TYPE_IMAGE) {
            const url = getImageUrl(src);
            return <ImageView url={url} {...(attributes || {})}/>;
        }
    },

    async onInsert(): Promise<ImageElement> {
        const {key} = await showModal({
            getBody: ({closeModal}) => <ImageEditor closeDialog={closeModal}/>,
            template: ModalTemplate.dialog
        });
        return {
            type: 'image',
            src: [{key}]
        };
    }
}