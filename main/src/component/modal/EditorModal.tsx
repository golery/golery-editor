import * as React from "react";
import styles from './EditorModal.module.scss';
import CloseIcon from "../icons/CloseIcon";

export const EditorModal = ({children}) => {
    const onClose = () => {
    };
    return (
        <div className={styles.fullScreen}>
            <div className={styles.dialog}>
                <div className={styles.closeButton} onClick={onClose}><CloseIcon/></div>
                {children}
            </div>
        </div>
    );
}
export const DialogFooter = ({children}) => {
    return (<div className={styles.footer}>{children}</div>);
}