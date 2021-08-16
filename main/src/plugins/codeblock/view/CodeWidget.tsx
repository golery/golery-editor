import * as React from "react";
import {useEffect, useRef} from "react";
import "./prism.css";
import Prism from 'prismjs';
import styles from "./CodeWidget.module.scss";
import {ModalTemplate, showModal} from "../../../component/modal/Modal";
import {CodeEditor} from "../edit/CodeEditor";
import {useFocused, useSelected} from "slate-react";
// There are dependencies between prismjs languages, need to import all them rather than just tsx
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';

export const CodeWidget = ({attributes, children, data, setData, readOnly}) => {
    const selected = useSelected();
    const focused = useFocused();

    useEffect(() => {
        setTimeout(() => {
            // ref.current && Prism.highlightAllUnder(ref.current);
            Prism.highlightAll();
        });

    }, [data.code]);

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

    return <div className={styles.holder} onDoubleClick={onEdit}  {...attributes}>
        <pre className={[styles.code, 'language-js', selected && focused ? styles.selected : ' '].join(' ')} contentEditable={false}>
            <code className='language-tsx'>{data.code}</code>
        </pre>
        {children}
    </div>;
}
