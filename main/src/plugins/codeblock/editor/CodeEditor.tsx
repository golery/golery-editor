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
        <textarea className={styles.code} value={code} onChange={e => setCode(e.target.value)}
                    placeholder={'Paste code here'}/>
        <DialogFooter>
            <button onClick={onClick}>SAVE</button>
        </DialogFooter>
    </div>);
}