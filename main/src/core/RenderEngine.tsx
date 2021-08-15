import * as React from 'react';
import {BLOCK_BULLETED_LIST, BLOCK_H1, BLOCK_H2, BLOCK_H3, BLOCK_LIST_ITEM, BLOCK_NUMBERED_LIST} from "./Schema";
import {ReactEditor, useSlate} from 'slate-react';
import {Transforms,} from 'slate'
import {TextNode, WidgetRenderer} from "./EditorTypes";
import {EditorPlugin} from "./EditorPlugin";

/** Block elements wraps multiple leaf elements */
function renderDefaultBlockElement(element: TextNode, attributes: object, children: any) {
    const type = element.type;
    // It's mandatory to pass attributes and children values. They come from slatejs library
    switch (type) {
        case BLOCK_BULLETED_LIST:
            return <ul {...attributes}>{children}</ul>
        case BLOCK_H1:
            return <h1 {...attributes}>{children}</h1>
        case BLOCK_H2:
            return <h2 {...attributes}>{children}</h2>
        case BLOCK_H3:
            return <h3 {...attributes}>{children}</h3>
        case BLOCK_LIST_ITEM:
            return <li {...attributes}>{children}</li>
        case BLOCK_NUMBERED_LIST:
            return <ol {...attributes}>{children}</ol>
        default:
            return <div {...attributes}>{children}</div>
    }
}

interface ElementProps {
    attributes: any,
    children: any,
    element: any,
    widgetRender: WidgetRenderer
}

const Element = (props: ElementProps)  => {
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

    return renderDefaultBlockElement(element, attributes, children);
}


interface LeafProps {
    attributes: any,
    children: any,
    leaf: any
}

const Leaf = ({attributes, children, leaf}: LeafProps) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

/** Render values as readonly. Note that slate is not used for rendering readonly */
const renderReadOnly = (elms: TextNode[], plugins?: EditorPlugin[], attributes?: any) => {
    if (!elms) return [];
    return elms.map((elm, index) => {
        if (elm.type || Array.isArray(elm.children)) {
            const attributes = {key: index};
            const children = renderReadOnly(elm.children, plugins, attributes);
            for (const plugin of plugins || []) {
                const result = plugin.renderView && plugin.renderView({data: elm, attributes: {key: index}, children});
                if (result) return result;
            }
            return renderDefaultBlockElement(elm, attributes, children);
        } else {
            return <Leaf attributes={{key: index}} children={(elm as any)?.text} leaf={elm}/>;
        }
    });
}

export {Element, Leaf, renderReadOnly};
