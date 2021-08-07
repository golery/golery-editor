import * as React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";
import {showModal} from "../../component/modal/EditorModal";
import {ImageEditor} from "./editor/ImageEditor";
import {goApi} from "../../core/GoApi";

export const ImagePlugin:EditorPlugin = {
    id: 'image',
    type: 'image',
    init({editor}) {
        editor.insertData = data => {
            console.log('Data', data);
        }
    },
    render({type, data, attributes, children}: WidgetRenderParams) {
        if (type === 'image') {
            const url = goApi.getFileUrl(data.key);
            return <div  {...attributes}>{children}<img src={url} alt={data.key}/></div>;
        }
    },
    async onInsert() {
        const {key} = await showModal(({closeDialog}) => <ImageEditor closeDialog={closeDialog}/>);
        console.log('vvv', key);
        return {
            source: 'file',
            key
        }
    }
}