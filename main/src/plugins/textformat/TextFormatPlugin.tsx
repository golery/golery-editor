import * as React from "react";
import {WidgetRenderParams} from "../../core/EditorTypes";
import {EditorPlugin} from "../../core/EditorPlugin";
import {
    TYPE_BULLETED_LIST,
    TYPE_H1,
    TYPE_H2,
    TYPE_H3,
    TYPE_LIST_ITEM,
    TYPE_NUMBERED_LIST
} from "../../core/Schema";

export const TextFormatPlugin: EditorPlugin = {
    id: "format",

    renderEdit({data, attributes, children}: WidgetRenderParams) {
        const {type} = data;
        // It's mandatory to pass attributes and children values. They come from slatejs library
        switch (type) {
            case TYPE_BULLETED_LIST:
                return <ul {...attributes}>{children}</ul>
            case TYPE_H1:
                return <h1 {...attributes}>{children}</h1>
            case TYPE_H2:
                return <h2 {...attributes}>{children}</h2>
            case TYPE_H3:
                return <h3 {...attributes}>{children}</h3>
            case TYPE_LIST_ITEM:
                return <li {...attributes}>{children}</li>
            case TYPE_NUMBERED_LIST:
                return <ol {...attributes}>{children}</ol>
            default:
                return <div {...attributes}>{children}</div>
        }
    }
}


interface LeafProps {
    attributes: any,
    children: any,
    leaf: any
}

export const LeafElement = ({attributes, children, leaf}: LeafProps) => {
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
