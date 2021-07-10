import * as React from 'react';
import {useCallback} from 'react';
import {Editable} from 'slate-react';
import {Element, Leaf} from "./core/RenderEngine";
import {WidgetRenderer} from "./core/EditorTypes";
import {EditorPluginContext} from "./GoleryEditor";
import {EditorPlugin} from "./core/EditorPlugin";

interface Props {
    /** Render custom element */
    widgetRender: WidgetRenderer
}

const GoleryEditable = ({widgetRender}:Props) => {
    const editorPlugins:EditorPlugin[] = React.useContext(EditorPluginContext);

    const renderer: WidgetRenderer = (params) => {
        for (const plugin of editorPlugins) {
            if (plugin.render) {
                const result = plugin.render(params);
                if (result) return result;
            }
        }
        // FIXME: create widget plugin
        return widgetRender(params);
    }
    const renderElement = useCallback(props => <Element {...props} widgetRender={renderer}/>, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    return (
        <Editable className={'golery-editable'} renderElement={renderElement} renderLeaf={renderLeaf}/>
    );
};

export default GoleryEditable;
