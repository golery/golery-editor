import * as React from "react";
import styles from './EditorModal.module.scss';
import CloseIcon from "../icons/CloseIcon";
import {ReactNode, useCallback} from "react";
import * as ReactDOM from "react-dom";
import {CodeEditor} from "../../plugins/codeblock/editor/CodeEditor";

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

type ModalBody = ({closeDialog: Function}) => ReactNode;
export function showModal<T>(getBody: ModalBody): Promise<T> {
    return new Promise((resolve) => {
        const elm = document.createElement('div');
        document.body.appendChild(elm);
        const closeDialog = (result: T) => {
            ReactDOM.unmountComponentAtNode(elm);
            elm.remove();
            resolve(result);
        }
        const children = getBody({closeDialog});
        ReactDOM.render(<EditorModal onCancel={() => closeDialog(undefined)}>{children}</EditorModal>, elm);
    });
}