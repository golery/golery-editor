import * as React from "react";
import {useEffect} from "react";
import "./prism.css";
import Prism from 'prismjs';
import styles from "./CodeWidget.module.scss";
import {ModalTemplate, showModal} from "../../../component/modal/Modal";
import {CodeEditor} from "../editor/CodeEditor";

export const CodeWidget = ({attributes, children, data, setData}) => {
    useEffect(() => {
        setTimeout(() => {
            Prism.highlightAll();
        });

    }, []);

    const onEdit = async () => {
        const code = await showModal<string>({getBody: ({closeModal}) => <CodeEditor code={data.code} onSave={code => closeModal(code)}/>, template: ModalTemplate.dialog});
        if (code && code.trim().length > 0) {
            setData({code});
        } else {
            setData();
        }
    }
    return <div className={styles.holder} onDoubleClick={onEdit}  {...attributes} >
        {children}
        <pre className={styles.code} contentEditable={false}>
            <code className='language-js'>{data.code}</code></pre>
    </div>;
}
