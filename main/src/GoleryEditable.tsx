import * as React from 'react';
import {useCallback} from 'react';
import {Editable} from 'slate-react';
import {Element, Leaf} from "./core/RenderEngine";
import {EditorContext, WidgetRenderer} from "./core/EditorTypes";
import {EditorPluginContext} from "./GoleryEditor";
import {EditorPlugin} from "./core/EditorPlugin";

interface Props {
}

const GoleryEditable = () => {
    const editorContext:EditorContext = React.useContext(EditorPluginContext);

    const renderer: WidgetRenderer = (params) => {
        console.log('RRR', editorContext);
        for (const plugin of editorContext.plugins) {
            if (plugin.render) {
                const result = plugin.render(params);
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
