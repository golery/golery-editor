import isUrl from 'is-url';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Descendant, Editor, Element as SlateElement, Range, Transforms,} from 'slate'
import {ReactEditor, useSlate} from 'slate-react';
import {useCallback, useMemo, useEffect, useState} from "react"
import {WidgetRenderer, WidgetRenderParams} from "../../core/EditorTypes";
import {BLOCK_LINK, BLOCK_OBJECT} from "../../core/Schema";
import {Plugin} from "../../core/Plugin";

const unwrapLink = editor => {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === 'link',
    })
}

const isLinkActive = editor => {
    const [link] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === 'link',
    })
    return !!link
}


export type LinkElement = { type: 'link'; data: { url: string }; children: Descendant[] }

const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const {selection} = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link: LinkElement = {
        type: 'link',
        data: {url},
        children: isCollapsed ? [{text: url}] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, {split: true})
        Transforms.collapse(editor, {edge: 'end'})
    }
}

const Portal = ({children}) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null
}

export const showLinkDialog = async (done) => {
    ReactDOM.render(<LinkDialog done={done}/>, document.body);
}

interface LinkDialogProps {
    controller: any
}

export const LinkDialog = (props: LinkDialogProps) => {
    const editor = useSlate();
    const [show, setShow] = useState(false);
    const [link, setLink] = useState<string>();
    const [text, setText] = useState<string>('link');
    const onInsert = () => {
        ReactEditor.focus(editor as ReactEditor);
        setTimeout(() => {
            wrapLink(editor, text || link);
        });
    }
    useEffect(() => {
        props.controller.showLinkDialog = (link) => {
            console.log('Show');
            setShow(true)
            setLink(link);
        }
        return () => props.controller.showLinkDialog = null;
    }, []);

    if (!show) return null;
    return (
        <div>LINK DIALOG {show}x
            <input value={link} onChange={e => setLink(e.target.value)}/>
            <input value={text} onChange={e => setText(e.target.value)}/>
            <button onClick={onInsert}>Insert</button>
        </div>
    );
}

export const init = ({editor, controller}) => {
    const {insertData, insertText, isInline} = editor

    editor.isInline = element => {
        return element.type === 'link' ? true : isInline(element)
    }

    editor.insertText = text => {
        if (text && isUrl(text)) {
            controller.showLinkDialog && controller.showLinkDialog(text);
        } else {
            insertText(text)
        }
    }

    editor.insertData = data => {
        const text = data.getData('text/plain')

        if (text && isUrl(text)) {
            controller.showLinkDialog && controller.showLinkDialog(text);
            wrapLink(editor, text)
        } else {
            insertData(data)
        }
    }
    return editor;
}

export const renderLink: WidgetRenderer = ({type, data, attributes, children}: WidgetRenderParams): React.ReactElement => {
    if (type === BLOCK_LINK) {
        return <a {...attributes} href={data.url}>{data.text | data.url}{children}</a>
    }
}

const linkPlugin: Plugin = {
    init,
    render: renderLink
}
export default linkPlugin;