
import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {ReactEditor, Slate, withReact} from 'slate-react'
import {withHistory} from 'slate-history';
import {createEditor, Descendant} from 'slate'
import {BLOCK_IMAGE, BLOCK_PARAGRAPH} from "./core/Schema";
import {EditorElement} from "./core/EditorTypes";
import {withLink} from "./plugins/link/LinkPlugins2";

const withImages = (editor: any) => {
    const {isVoid} = editor

    editor.isVoid = (element: any) => {
        return element.type === BLOCK_IMAGE || element.type === 'code' ? true : isVoid(element)
    }
    return editor;
}

class Controller {
    editor: any;

    constructor(editor: any) {
        this.editor = editor;
    }

    focus() {
        ReactEditor.focus(this.editor);
    }
}

interface Props {
    children: any
    editorRef: any
    value: object[]
    setValue: (value: EditorElement[]) => void
}

const getEmptyTextValue = () => ([{
    type: BLOCK_PARAGRAPH,
    children: [{text: ""}],
}]);

const GoleryEditor = ({children, editorRef, value, setValue}: Props) => {
    const editor = useMemo(() => withLink(withImages(withHistory(withReact(createEditor() as ReactEditor)))), []);
    useEffect(() => {
        editorRef.current = new Controller(editor);
    }, [editor]);

    const editorValue = Array.isArray(value) ? value : getEmptyTextValue();
    return (
        <Slate editor={editor} value={editorValue as Descendant[]} onChange={newValue => setValue(newValue as EditorElement[])}>
            {children}
        </Slate>
    );
}

export default GoleryEditor;

