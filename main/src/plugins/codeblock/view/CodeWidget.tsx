import * as React from "react";
import {useEffect} from "react";
import "./prism.css";
import Prism from 'prismjs';
import styles from "./CodeWidget.module.scss";
import {ReactEditor, useSlateStatic} from "slate-react";
import {ModalTemplate, showModal} from "../../../component/modal/EditorModal";
import {CodeEditor} from "../editor/CodeEditor";

export const CodeWidget = ({attributes, children, data, setData}) => {
    useEffect(() => {
        setTimeout(() => {
            Prism.highlightAll();
        });

    }, []);

    const onEdit = async () => {
        const code = await showModal<string>({getBody: ({closeDialog}) => <CodeEditor code={data.code} onSave={code => closeDialog(code)}/>, template: ModalTemplate.dialog});
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
