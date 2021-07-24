import * as React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";
import {showModal} from "../../component/modal/EditorModal";
import {ImageEditor} from "./editor/ImageEditor";
import {ReactEditor} from "slate-react";

export const ImagePlugin:EditorPlugin = {
    id: 'image',
    type: 'image',
    // name: 'Image',
    // icon: 'image',
    init({editor}) {
        editor.insertData = data => {
            console.log('Data', data);
        }
    },
    render({type, data, attributes, children}: WidgetRenderParams) {
        if (type === 'image') return <div  {...attributes}>{children}<img src={data.url} alt={data.url}/></div>;
    },
    async onInsert() {
        await showModal(({closeDialog}) => <ImageEditor/>);
        // return ({url: 'https://picsum.photos/200/300'});
    }
}