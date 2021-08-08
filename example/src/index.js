import * as React from "react";
import {useState, useRef, useMemo} from "react";
import * as ReactDOM from "react-dom";

import {EditorToolbar, GoleryEditable, GoleryEditor, getStandardPlugins} from 'golery-editor';

const DemoPage = () => {
    const [value, setValue] = useState();
    const plugins = useMemo(() => getStandardPlugins(), []);
    const editor = useRef(null);

    return <div>
        <GoleryEditor editorRef={editor} value={value} setValue={setValue} plugins={plugins}>
            <EditorToolbar widgets={plugins}/>
            <GoleryEditable/>
        </GoleryEditor>
    </div>
}
ReactDOM.render(<DemoPage />, document.getElementById("root"));
