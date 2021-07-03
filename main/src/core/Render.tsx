import * as React from 'react';
import {
    BLOCK_BULLETED_LIST,
    BLOCK_H1,
    BLOCK_H2,
    BLOCK_H3,
    BLOCK_IMAGE,
    BLOCK_LIST_ITEM,
    BLOCK_NUMBERED_LIST
} from "./Schema";
import {ReactEditor, useSlate} from 'slate-react';
import {Transforms,} from 'slate'
import {EditorElement} from "./EditorTypes";

export function renderBlockElement(element: EditorElement, attributes: object, children: any) {
    const type = element.type;
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
        case BLOCK_IMAGE:
            return <div {...attributes}><img src={element.data.url}/>{children}</div>
        default:
            return <p {...attributes}>{children}</p>
    }
}

export const renderLeafElement = (leaf: any, children: any, attributes: any) => {
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
    attributes : any,
    children: any,
    element: any,
    renderObject: (setData: any, type: string, data: object) => any
}
const Element = (props: ElementProps) => {
    const { attributes, children, element, renderObject } = props;
    const editor: ReactEditor = useSlate() as ReactEditor;

    const setData = (data:any) => {
        const path = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor,  {data} as any, { at: path })
    }
    let custom = renderObject(setData, element.type, element.data);
    if (custom) {
        return <div {...attributes} contentEditable={false}>{children}{custom}</div>;
    } else {
        return renderBlockElement(element, attributes, children);
    }
}


interface LeafProps {
    attributes : any,
    children: any,
    leaf: any
}



const Leaf = ({ attributes, children, leaf} : LeafProps) => {
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

export {Element, Leaf};