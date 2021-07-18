import * as React from 'react';
import {useEffect, useState, useCallback} from 'react';
import {ReactEditor, useSlate} from 'slate-react';
import {BaseRange} from 'slate';
import styles from './LinkDialog.module.scss';
import CloseIcon from "../../component/icons/CloseIcon";

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
        // setShow(false);
        ReactEditor.focus(editor as ReactEditor);
        setTimeout(() => {
            editor.selection = editorSelection.current;
            wrapLink(editor, link, text || link);
        });
        setShow(false);
    }
    useEffect(() => {
        controller.showLinkDialog = (link) => {
            editorSelection.current = editor.selection;
            setText('link');
            setLink(link);
            setShow(true)
        }
        return () => controller.showLinkDialog = null;
    }, [editor]);

    const onClose = useCallback(() => {setShow(false)}, []);

    if (!show) return null;

    return (
        <div className={styles.fullScreen} onClick={onClose}>
            <div className={styles.dialog} onClick={(e) => {e.stopPropagation()}}>
                <div className={styles.closeButton} onClick={onClose}><CloseIcon/></div>
                <div className={styles.header}>
                    ADD/EDIT LINK
                </div>
                <div className={styles.body}>
                    <input value={link} onChange={e => setLink(e.target.value)} placeholder={"Url"}/>
                    <input value={text} onChange={e => setText(e.target.value)}  placeholder={"Link text"}/>
                </div>
                <div className={styles.footer}>
                    <button onClick={onInsert}>Insert</button>
                </div>
            </div>

        </div>
    );
}
