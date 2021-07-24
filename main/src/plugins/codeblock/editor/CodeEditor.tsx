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
    const onClick = useCallback(() => {onSave(editingCode)}, [editingCode]);
    const displayCode = editingCode.length > 0 ? editingCode : code || '';
    return (<div>
        <textarea className={styles.code} value={displayCode} onChange={e => setEditingCode(e.target.value)}
                    placeholder={'Paste code here'}/>
        <DialogFooter>
            <button onClick={onClick}>SAVE</button>
        </DialogFooter>
    </div>);
}