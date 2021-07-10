import * as React from 'react';
import {BLOCK_BULLETED_LIST, BLOCK_H1, BLOCK_H2, BLOCK_H3, BLOCK_LIST_ITEM, BLOCK_NUMBERED_LIST} from "./Schema";
import {ReactEditor, useSlate} from 'slate-react';
import {Transforms,} from 'slate'
import {EditorElement, RenderMode, WidgetRenderer} from "./EditorTypes";

/** Block elements wraps multiple leaf elements */
function renderBlockElement(element: EditorElement, attributes: object, children: any,
                            customRender: (type: string, data: any) => React.ReactNode) {
    let customElm = customRender && customRender(element.type, element.data);
    if (customElm) {
        return <div {...attributes} contentEditable={false}>{children}{customElm}</div>;
    }

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
            return <p {...attributes}>{children}</p>
    }
}

const renderLeafElement = (leaf: any, children: any, attributes: any) => {
    if (leaf.bold) {
        children = <strong {...attributes}>{children}</strong>
    }

    if (leaf.code) {
        children = <code {...attributes}>{children}</code>
    }

    if (leaf.italic) {
        children = <em {...attributes}>{children}</em>
    }

    if (leaf.underline) {
        children = <u {...attributes}>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

interface ElementProps {
    attributes: any,
    children: any,
    element: any,
    widgetRender: WidgetRenderer
}

const Element = (props: ElementProps) => {
    const {attributes, children, element, widgetRender} = props;
    const editor: ReactEditor = useSlate() as ReactEditor;

    const setData = (data: any) => {
        const path = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, {data} as any, {at: path})
    }

    return renderBlockElement(element, attributes, children,
        (type, data) => widgetRender && widgetRender({type, data, mode: RenderMode.EDIT, setData}));
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

    if (leaf.code) {
        children = <code>{children}</code>
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
const renderReadOnly = (elms: EditorElement[], widgetRender: WidgetRenderer) => {
    if (!elms) return [];
    return elms.map((elm, index) => {
        if (elm.type || Array.isArray(elm.children)) {
            const children = renderReadOnly(elm.children, widgetRender);
            return renderBlockElement(elm, {key: index}, children,
                (type, data) => widgetRender && widgetRender({type, data, mode: RenderMode.VIEW}))
        } else {
            return renderLeafElement(elm, (elm as any)?.text, {key: index});
        }
    });
}

export {Element, Leaf, renderReadOnly};