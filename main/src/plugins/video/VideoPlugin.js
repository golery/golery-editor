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
        // add style={{ pointerEvents: "none" }}  to disable playing
        return <iframe src={link} {...attributes}/>;
    }
}


export default function () {
    return {
        renderNode(props, editor, next) {
            const {attributes, children, node} = props;

            if (node.type === 'youtube') {
                const {data} = node;
                const id = data.get('id');
                if (editor.props.readOnly) {
                    let link = `https://www.youtube.com/embed/${id}`;
                    return <VideoLink link={link} width={data.get('width')}
                                      height={data.get('height')} />;
                } else {
                    let linkScreenshot = `https://img.youtube.com/vi/${id}/0.jpg`;
                    return <img src={linkScreenshot} {...attributes}/>;
                }
            } else
                return next();
        },
        onPaste(event, editor, next) {
            const {type, text} = getEventTransfer(event);
            console.log(type);
            if (text && isUrl(text) && text.startsWith("https://www.youtube.com/")) {
                let url = urlParser.parse(text);
                if (url && url.id) {
                    console.log('Insert video', text);
                    editor.insertText("\n").insertInline({type: 'youtube', data: {id: url.id, width: 853, height: 505}})
                        .moveToStartOfNextText()
                        .insertText("\n")
                        .focus();
                    return;
                }
            }

            next();
        }
    };
}
