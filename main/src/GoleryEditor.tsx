import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {useEffect, useMemo, useRef} from 'react';
import {ReactEditor, Slate, withReact} from 'slate-react'
import {withHistory} from 'slate-history';
import {createEditor, Descendant} from 'slate'
import {BLOCK_IMAGE, BLOCK_PARAGRAPH} from "./core/Schema";
import {EditorElement} from "./core/EditorTypes";
import LinkPlugin from "./plugins/link/LinkPlugin";
import {EditorPlugin} from "./core/EditorPlugin";

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

// This context pass list of plugins to GoleryEditable
export const EditorPluginContext = React.createContext<EditorPlugin[]>([]);

const GoleryEditor = ({children, editorRef, value, setValue}: Props) => {
    const {linkPlugin, editor} = useMemo(() => {
        let editor = withImages(withHistory(withReact(createEditor() as ReactEditor)));
        const linkPlugin = new LinkPlugin(editor);
        linkPlugin.init(editor);
        return ({linkPlugin, editor});
    }, []);

    useEffect(() => {
        editorRef.current = new Controller(editor);
    }, [editor]);

    const pluginContext = useMemo(() => ([linkPlugin]), [linkPlugin]);

    const editorValue = Array.isArray(value) ? value : getEmptyTextValue();
    return (
        <Slate editor={editor} value={editorValue as Descendant[]}
               onChange={newValue => setValue(newValue as EditorElement[])}>
            <EditorPluginContext.Provider value={pluginContext}>
                {children}
                {linkPlugin.getModal()}
            </EditorPluginContext.Provider>
        </Slate>
    );
}

export default GoleryEditor;

