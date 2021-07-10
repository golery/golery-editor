import React from "react";
import {getEventTransfer} from 'slate-react';
import isUrl from 'is-url'

/**
 * A change helper to standardize wrapping links.
 *
 * @param {Editor} editor
 * @param {String} href
 */

function wrapLink(editor, href) {
    editor.wrapInline({
        type: 'link',
        data: { href },
    })

    editor.moveToEnd()
}

/**
 * A change helper to standardize unwrapping links.
 *
 * @param {Editor} editor
 */

function unwrapLink(editor) {
    editor.unwrapInline('link')
}

export default function () {
    return {
        renderNode(props, editor, next) {
            const {attributes, children, node} = props;

            if (node.type === 'link') {
                const {data} = node;
                const href = data.get('href');
                return (
                    <a {...attributes} href={href} target="_blank">
                        {children}
                    </a>
                )
            } else return next();
        },
        onPaste(event, editor, next) {
            const {type, text} = getEventTransfer(event);
            console.log(type);
            if (text && isUrl(text)) {
                let href = text;
                console.log('Insert link', text);
                editor
                    .insertText(text)
                    .moveFocusBackward(text.length)
                    .command(wrapLink, href)
            } else next();
        }
    };
}
