import React from "react";
import {getEventTransfer} from 'slate-react';
import isUrl from 'is-url'
import urlParser from "js-video-url-parser";


class VideoLink extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (this.props.link === nextProps.link) return false;
        return true;
    }

    render() {
        const { link, ...attributes } = this.props;
        return <iframe style={{ pointerEvents: "none" }} src={link} {...attributes}/>;
    }
}


export default function () {
    return {
        renderNode(props, editor, next) {
            const {attributes, children, node} = props;

            if (node.type === 'youtube') {
                const {data} = node;
                const id = data.get('id');
                let link = `https://www.youtube.com/embed/${id}`;
                return <VideoLink link={link} {...attributes}/>;
            } else
                return next();
        },
        onPaste(event, editor, next) {
            const {type, text} = getEventTransfer(event);
            console.log(type);
            if (text && isUrl(text) && text.startsWith("https://www.youtube.com/")) {
                let url = urlParser.parse('http://www.youtube.com/watch?v=HRb7B9fPhfA');
                if (url) {
                    console.log('Insert video', text);
                    editor.insertInline({type: 'youtube', data: {id: url.id, width: 800, height: 600}})
                        .moveToStartOfNextText()
                        .focus();
                    return;
                }
            }

            next();
        }
    };
}
