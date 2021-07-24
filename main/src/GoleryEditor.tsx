import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {ReactEditor, Slate, withReact} from 'slate-react'
import {withHistory} from 'slate-history';
import {createEditor, Descendant} from 'slate'
import {BLOCK_IMAGE, BLOCK_PARAGRAPH} from "./core/Schema";
import {EditorContext, EditorElement} from "./core/EditorTypes";
import LinkPlugin from "./plugins/link/LinkPlugin";
import {EditorPlugin} from "./core/EditorPlugin";
import {getStandardPlugins} from "./plugins";

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
    plugins?: EditorPlugin[]
}

const getEmptyTextValue = () => ([{
    type: BLOCK_PARAGRAPH,
    children: [{text: ""}],
}]);

// This context pass list of plugins to GoleryEditable
export const EditorPluginContext = React.createContext<EditorContext>({plugins:getStandardPlugins()});

const editorContext = {plugins: getStandardPlugins()};
const GoleryEditor = ({children, editorRef, value, setValue, plugins}: Props) => {
    const {linkPlugin, editor} = useMemo(() => {
        let editor = withImages(withHistory(withReact(createEditor() as ReactEditor)));
        if (plugins) {
            for (let plugin of plugins) {
                plugin?.init({editor, controller: {}});
            }
        }
        return ({linkPlugin, editor});
    }, []);

    useEffect(() => {
        editorRef.current = new Controller(editor);
    }, [editor]);


    console.log('s', editor.selection);
    const editorValue = Array.isArray(value) ? value : getEmptyTextValue();
    return (
        <Slate editor={editor} value={editorValue as Descendant[]}
               onChange={newValue => setValue(newValue as EditorElement[])}>
            <EditorPluginContext.Provider value={editorContext}>
                {children}
            </EditorPluginContext.Provider>
        </Slate>
    );
}

export default GoleryEditor;

