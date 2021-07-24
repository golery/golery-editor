import * as React from "react";
import styles from './CodeEditor.module.scss';
import {DialogFooter} from "../../../component/modal/EditorModal";
import {useCallback, useState} from "react";

interface Props {
    onSave: (code:string) => void
}
export const CodeEditor = ({onSave}) => {
    const [code, setCode] = useState('');
    const onClick = useCallback(() => {onSave(code)}, [code]);
    return (<div>
        <textarea className={styles.code} value={code} onChange={e => setCode(e.target.value)}>This is code</textarea>
        <DialogFooter>
            <button onClick={onClick}>Save</button>
        </DialogFooter>
    </div>);
}