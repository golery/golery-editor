import * as React from "react";
import {useEffect} from "react";
import "./prism.css";
import Prism from 'prismjs';
import styles from "./CodeWidget.module.scss";
import {ModalTemplate, showModal} from "../../../component/modal/Modal";
import {CodeEditor} from "../edit/CodeEditor";

export const CodeWidget = ({attributes, children, data, setData, readOnly}) => {
    useEffect(() => {
        setTimeout(() => {
            Prism.highlightAll();
        });

    }, []);

    const onEdit = async () => {
        if (readOnly) return;
        const code = await showModal<string>({
            getBody: ({closeModal}) => <CodeEditor code={data.code} onSave={code => closeModal(code)}/>,
            template: ModalTemplate.dialog
        });
        if (code && code.trim().length > 0) {
            setData({code});
        }
    }

    return <div className={styles.holder} onDoubleClick={onEdit}  {...attributes} >
        {children}
        <pre className={styles.code} contentEditable={false}>
            <code className='language-js'>{data.code}</code>
        </pre>
    </div>;
}
