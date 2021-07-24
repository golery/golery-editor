import * as React from "react";
import styles from './CodeEditor.module.scss';
import {DialogFooter} from "../../../component/modal/EditorModal";

export const CodeEditor = () => {
    return (<div>
        <pre className={styles.code} contentEditable={true}>This is code</pre>
        <DialogFooter>
            <button>Save</button>
        </DialogFooter>
    </div>);
}