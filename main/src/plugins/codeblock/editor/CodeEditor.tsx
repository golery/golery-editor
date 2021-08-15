import * as React from "react";
import styles from './CodeEditor.module.scss';
import {DialogFooter} from "../../../component/modal/EditorModal";
import {useCallback, useState} from "react";

interface Props {
    code: string
    onSave: (code:string) => void
}
export const CodeEditor = ({code, onSave}: Props) => {
    const [editingCode, setEditingCode] = useState('');
    const [dirty, setDirty] = useState(false);
    const onClick = useCallback(() => {onSave(editingCode)}, [editingCode]);
    const onChange = useCallback((e) => {
        setDirty(true);
        setEditingCode(e.target.value)
    }, []);
    const displayCode = dirty ? editingCode : code;
    return (<div>
        <textarea className={styles.code} value={displayCode} onChange={onChange}
                    placeholder={'Paste code here'}/>
        <DialogFooter>
            <button onClick={onClick}>SAVE</button>
        </DialogFooter>
    </div>);
}