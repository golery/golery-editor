import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {ReactEditor, Slate, withReact} from 'slate-react'
import {withHistory} from 'slate-history';
import {createEditor, Descendant} from 'slate'
import {TYPE_PARAGRAPH} from "./Schema";
import {EditorContext, TextNode} from "./EditorTypes";
import {EditorPlugin} from "./EditorPlugin";
import {getStandardPlugins} from "../plugins";
import {EditorController} from "./EditorController";

const withVoidElements = (editor: any) => {
    editor.voidElements = [];
    const {isVoid} = editor
    editor.isVoid = (element: any) => {
        if (element.type && editor.voidElements.includes(element.type)) {
            console.log('True for', element.type);
            return true;
        }
        return isVoid(element)
    }
    return editor;
}


interface Props {
    children: any
    controllerRef: any
    value: object[]
    setValue: (value: TextNode[]) => void
    plugins?: EditorPlugin[]
}

const getEmptyTextValue = () => ([{
    type: TYPE_PARAGRAPH,
    children: [{text: ""}],
}]);

// This context pass list of plugins to GoleryEditable
export const EditorPluginContext = React.createContext<EditorContext>({plugins: getStandardPlugins()});

const editorContext = {plugins: getStandardPlugins()};
const EditorContext = ({children, controllerRef, value, setValue, plugins}: Props) => {
    const {linkPlugin, editor} = useMemo(() => {
        let editor = withVoidElements(withHistory(withReact(createEditor() as ReactEditor)));
        if (plugins) {
            for (let plugin of plugins) {
                plugin?.init && plugin?.init({editor, controller: {}});
            }
        }
        return ({linkPlugin, editor});
    }, []);

    useEffect(() => {
        controllerRef.current = new EditorController(editor);
    }, [editor]);

    const editorValue = Array.isArray(value) ? value : getEmptyTextValue();
    return (
        <Slate editor={editor} value={editorValue as Descendant[]}
               onChange={newValue => setValue(newValue as TextNode[])}>
            <EditorPluginContext.Provider value={editorContext}>
                {children}
            </EditorPluginContext.Provider>
        </Slate>
    );
}

export default EditorContext;

