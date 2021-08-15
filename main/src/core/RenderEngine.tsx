import * as React from 'react';
import {ReactEditor, useSlate} from 'slate-react';
import {Transforms,} from 'slate'
import {TextNode, WidgetRenderer} from "./EditorTypes";
import {EditorPlugin} from "./EditorPlugin";
import {LeafElement} from "../plugins/textformat/TextFormatPlugin";


interface ElementProps {
    attributes: any,
    children: any,
    element: any,
    widgetRender: WidgetRenderer
}

const BlockElement = (props: ElementProps)  => {
    const {attributes, children, element, widgetRender} = props;
    const editor: ReactEditor = useSlate() as ReactEditor;

    const setData = (data: any) => {
        if (data === undefined) {
            editor.deleteForward('block');
        } else {
            const path = ReactEditor.findPath(editor, element);
            Transforms.setNodes(editor, {data} as any, {at: path})
        }
    }

    if (widgetRender) {
        const elm = widgetRender({data: element, attributes, children, setData});
        if (elm) return elm;
    }

    return <div/>;
}


/** Render values as readonly. Note that slate is not used for rendering readonly */
const renderReadOnly = (elms: TextNode[], plugins?: EditorPlugin[], attributes?: any) => {
    if (!elms) return [];
    return elms.map((elm, index) => {
        console.log(elm);
        if (elm.type || Array.isArray(elm.children)) {
            const attributes = {key: index};
            const children = renderReadOnly(elm.children, plugins, attributes);
            for (const plugin of plugins || []) {
                const renderer = plugin.renderView || plugin.renderEdit;
                const result = renderer && renderer({data: elm, attributes: {key: index}, children});

                if (result) return result;
            }
            return <div key={index}>[Widget not supported, type={elm.type}]</div>;
        } else {
            return <LeafElement key={index} attributes={{...attributes}} children={(elm as any)?.text} leaf={elm}/>;
        }
    });
}

export {BlockElement, renderReadOnly};
