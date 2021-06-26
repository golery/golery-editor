import React from 'react';
import {BLOCK_BULLETED_LIST, BLOCK_IMAGE, BLOCK_LIST_ITEM, BLOCK_NUMBERED_LIST, BLOCK_OBJECT} from "./Schema";

// Ref. https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx
const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>
        case BLOCK_BULLETED_LIST:
            return <ul {...attributes}>{children}</ul>
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
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
        case BLOCK_OBJECT:
            return <div {...attributes} contentEditable={false}>OBJECT{children}</div>
        default:
            return <p {...attributes}>{children}</p>
    }
}

const Leaf = ({ attributes, children, leaf }) => {
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