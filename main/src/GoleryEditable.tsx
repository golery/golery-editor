import * as React from 'react';
import {useCallback} from 'react';
import {Editable} from 'slate-react';
import {Element, Leaf} from "./core/RenderEngine";
import {WidgetRenderer} from "./core/EditorTypes";
import linkPlugin, {renderLink} from "./plugins/link/LinkPlugin";

interface Props {
    /** Render custom element */
    widgetRender: WidgetRenderer
}

const GoleryEditable = ({widgetRender}:Props) => {
    const renderer: WidgetRenderer = (params) => {
        const result = linkPlugin.render(params);
        if (result) return result;
        return widgetRender(params);
    }
    const renderElement = useCallback(props => <Element {...props} widgetRender={renderer}/>, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    return (
        <Editable className={'golery-editable'} renderElement={renderElement} renderLeaf={renderLeaf}/>
    );
};

export default GoleryEditable;
