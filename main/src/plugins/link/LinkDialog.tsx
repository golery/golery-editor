import * as React from 'react';
import {useState} from 'react';
import styles from './LinkDialog.module.scss';
import CloseIcon from "../../component/icons/CloseIcon";

interface Props {
    url: string,
    closeModal: any
}

export const LinkDialog = ({url, closeModal}: Props) => {
    const [link, setLink] = useState<string>(url);
    const [text, setText] = useState<string>('link');
    const onInsert = () => {
        closeModal({link, text});
    }
    const onClose = () => {};

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
