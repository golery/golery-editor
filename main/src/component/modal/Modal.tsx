import {ReactElement} from "react";
import * as ReactDOM from "react-dom";
import * as React from "react";
import {EditorModal} from "./EditorModal";

export type CloseDialogFunc = ((result: any) => void);
type ModalBody = ({closeModal: CloseDialogFunc}) => ReactElement;

export enum ModalTemplate {
    dialog = 'dialog'
}
export type ShowModalParams = {
    getBody: ModalBody,
    template?: ModalTemplate
}

export function showModal<T>({getBody, template} : ShowModalParams): Promise<T> {
    return new Promise((resolve) => {
        const keyListener = (event) => {
            if (event.key === 'Escape') {
                closeModal(undefined);
                event.preventDefault();
                event.stopPropagation();
            }
        }

        const elm = document.createElement('div');
        document.body.appendChild(elm);
        const closeModal = (result: T) => {
            document.removeEventListener('keyup', keyListener);
            ReactDOM.unmountComponentAtNode(elm);
            elm.remove();
            resolve(result);
        }

        document.addEventListener('keyup', keyListener);

        const children: ReactElement = getBody({closeModal});
        const fullScreen = template === ModalTemplate.dialog ? <EditorModal onCancel={() => closeModal(undefined)}>{children}</EditorModal> :
            children
        ReactDOM.render(fullScreen, elm);
    });
}
