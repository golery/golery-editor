import * as React from "react";
import styles from './EditorModal.module.scss';
import CloseIcon from "../icons/CloseIcon";
import {useCallback} from "react";

interface Props {
    onCancel: () => void
    children: any
}

export const EditorModal = ({onCancel, children}) => {
    return (
        <div className={styles.fullScreen}>
            <div className={styles.dialog}>
                <div className={styles.closeButton} onClick={useCallback(() => onCancel(), [])}><CloseIcon/></div>
                {children}
            </div>
        </div>
    );
}
export const DialogFooter = ({children}) => {
    return (<div className={styles.footer}>{children}</div>);
}