import * as React from 'react';
import {useEffect, useState} from 'react';
import {ReactEditor, useSlate} from 'slate-react';
import {BaseRange} from 'slate';

interface LinkDialogProps {
    controller: LinkPluginController
    wrapLink: (editor, url, text) => void
}

export const LinkDialog = ({controller, wrapLink}: LinkDialogProps) => {
    const editor = useSlate();
    const editorSelection = React.useRef<BaseRange>();
    const [show, setShow] = useState(false);
    const [link, setLink] = useState<string>();
    const [text, setText] = useState<string>('link');
    const onInsert = () => {
        console.log('xxx', editor.selection);
        // setShow(false);
        ReactEditor.focus(editor as ReactEditor);
        setTimeout(() => {
            editor.selection = editorSelection.current;
            wrapLink(editor, link, text || link);
        });
    }
    useEffect(() => {
        controller.showLinkDialog = (link) => {
            editorSelection.current = editor.selection;
            setShow(true)
            setLink(link);
        }
        return () => controller.showLinkDialog = null;
    }, [editor]);

    if (!show) return null;
    return (
        <div>LINK DIALOG {show}
            <input value={link} onChange={e => setLink(e.target.value)}/>
            <input value={text} onChange={e => setText(e.target.value)}/>
            <button onClick={onInsert}>Insert</button>
        </div>
    );
}
