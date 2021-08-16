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
    plugins: EditorPlugin[]
}

const BlockElement = (props: ElementProps)  => {
    const {attributes, children, element, plugins} = props;
    const editor: ReactEditor = useSlate() as ReactEditor;

    const setData = (data: any) => {
        if (data === undefined) {
            editor.deleteForward('block');
        } else {
            const path = ReactEditor.findPath(editor, element);
            Transforms.setNodes(editor, data, {at: path})
        }
    }

    for (const plugin of plugins) {
        if (plugin.renderEdit) {
            const result = plugin.renderEdit({data: element, setData, attributes, children});
            if (result) return result;
        }
    }

    return <div/>;
}


/** Render values as readonly. Note that slate is not used for rendering readonly */
const renderReadOnly = (elms: TextNode[], plugins?: EditorPlugin[]) => {
    if (!elms) return [];

    return elms.map((elm, index) => {
        if (elm.type || Array.isArray(elm.children)) {
            const children = renderReadOnly(elm.children, plugins);
            for (const plugin of plugins || []) {
                const renderer = plugin.renderView || plugin.renderEdit;
                const result = renderer && renderer({data: elm, attributes: {key: index}, children});

                if (result) return <React.Fragment key={index}>{result}</React.Fragment>;
            }
            return <div key={index}>[Widget not supported, type={elm.type}]</div>;
        } else {
            return <LeafElement key={index} attributes={{}} children={(elm as any)?.text} leaf={elm}/>;
        }
    });
}

export {BlockElement, renderReadOnly};
