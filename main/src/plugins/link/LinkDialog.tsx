import * as React from 'react';
import {useEffect, useState} from 'react';
import {ReactEditor, useSlate} from 'slate-react';

interface LinkDialogProps {
    controller: LinkPluginController
    wrapLink: (editor, url, text) => void
}

export const LinkDialog = ({controller, wrapLink}: LinkDialogProps) => {
    const editor = useSlate();
    const [show, setShow] = useState(false);
    const [link, setLink] = useState<string>();
    const [text, setText] = useState<string>('link');
    const onInsert = () => {
        setShow(false);
        ReactEditor.focus(editor as ReactEditor);
        setTimeout(() => {
            wrapLink(editor, link, text || link);
        });
    }
    useEffect(() => {
        controller.showLinkDialog = (link) => {
            setShow(true)
            setLink(link);
        }
        return () => controller.showLinkDialog = null;
    }, []);

    if (!show) return null;
    return (
        <div>LINK DIALOG {show}
            <input value={link} onChange={e => setLink(e.target.value)}/>
            <input value={text} onChange={e => setText(e.target.value)}/>
            <button onClick={onInsert}>Insert</button>
        </div>
    );
}