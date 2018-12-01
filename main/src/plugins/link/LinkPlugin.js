import React from "react";
import {getEventTransfer} from 'slate-react';
import isUrl from 'is-url'

export default function () {
    return {
        renderNode(props, editor, next) {
            const {attributes, children, node} = props;

            if (node.type === 'link') {
                const {data} = node;
                const href = data.get('href');
                return (
                    <a {...attributes} href={href} target="_blank">{href}
                        {children}
                    </a>
                )
            } else return next();
        },
        onPaste(event, editor, next) {
            const {type, text} = getEventTransfer(event);
            console.log(type);
            if (text && isUrl(text)) {
                console.log('Insert link', text);
                editor.insertInline({type: 'link', data: {href: text}});
            } else next();
        }
    };
}
