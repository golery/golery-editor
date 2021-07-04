import * as React from 'react';
import {useCallback} from 'react';
import {Editable} from 'slate-react';
import {Element, Leaf} from "./core/RenderEngine";
import {WidgetRenderer} from "./core/EditorTypes";

interface Props {
    /** Render custom element */
    widgetRender: WidgetRenderer
}

const GoleryEditable = ({widgetRender}) => {
    const renderElement = useCallback(props => <Element {...props} widgetRender={widgetRender}/>, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    return (
        <Editable className={'golery-editable'} renderElement={renderElement} renderLeaf={renderLeaf}/>
    );
};

export default GoleryEditable;
