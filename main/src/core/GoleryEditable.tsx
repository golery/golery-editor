import * as React from 'react';
import {useCallback} from 'react';
import {Editable} from 'slate-react';
import {Element, Leaf} from "./RenderEngine";
import {EditorContext, WidgetRenderer} from "./EditorTypes";
import {EditorPluginContext} from "./EditorContext";

const GoleryEditable = () => {
    const editorContext:EditorContext = React.useContext(EditorPluginContext);

    const renderer: WidgetRenderer = (params) => {
        for (const plugin of editorContext.plugins) {
            if (plugin.renderEdit) {
                const result = plugin.renderEdit(params);
                if (result) return result;
            }
        }
    }
    const renderElement = useCallback(props => <Element {...props} widgetRender={renderer}/>, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    return (
        <Editable className={'golery-editable'} renderElement={renderElement} renderLeaf={renderLeaf}/>
    );
};

export default GoleryEditable;
