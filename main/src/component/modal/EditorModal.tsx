import * as React from "react";
import {ReactElement, ReactNode, useCallback} from "react";
import styles from './EditorModal.module.scss';
import CloseIcon from "../icons/CloseIcon";
import * as ReactDOM from "react-dom";

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

export type CloseDialogFunc = ((result: any) => void);
type ModalBody = ({closeDialog: CloseDialogFunc}) => ReactElement;

export enum ModalTemplate {
    dialog = 'dialog'
}
export function showModal<T>({getBody, template} : {getBody: ModalBody, template?: ModalTemplate}): Promise<T> {
    return new Promise((resolve) => {
        const elm = document.createElement('div');
        document.body.appendChild(elm);
        const closeDialog = (result: T) => {
            ReactDOM.unmountComponentAtNode(elm);
            elm.remove();
            resolve(result);
        }
        const children: ReactElement = getBody({closeDialog});
        const fullScreen = template === ModalTemplate.dialog ? <EditorModal onCancel={() => closeDialog(undefined)}>{children}</EditorModal> :
            children
        ReactDOM.render(fullScreen, elm);
    });
}
