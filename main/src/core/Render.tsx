import * as React from 'react';
import {BLOCK_BULLETED_LIST, BLOCK_IMAGE, BLOCK_LIST_ITEM, BLOCK_NUMBERED_LIST, BLOCK_OBJECT} from "./Schema";
import {Editable, ReactEditor, useSlate, useSlateStatic} from 'slate-react';
import {
    Editor,
    Transforms,
    Range,
    Point,
    createEditor,
    Descendant,
    BaseEditor,
    Element as SlateElement,
} from 'slate'

function renderStandardElement(element: any, attributes: any, children: any) {
    const type = element.type;
    switch (type) {
        case BLOCK_BULLETED_LIST:
            return <ul {...attributes}>{children}</ul>
        case 'h1':
            return <h1 {...attributes}>{children}</h1>
        case 'h2':
            return <h2 {...attributes}>{children}</h2>
        case 'h3':
            return <h3 {...attributes}>{children}</h3>
        case BLOCK_LIST_ITEM:
            return <li {...attributes}>{children}</li>
        case BLOCK_NUMBERED_LIST:
            return <ol {...attributes}>{children}</ol>
        case BLOCK_IMAGE:
            return <div {...attributes}><img src={element.url}></img>{children}</div>
        default:
            return <p {...attributes}>{children}</p>
    }
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
        return renderStandardElement(element, attributes, children);
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