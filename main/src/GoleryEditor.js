import React, {useEffect, useMemo, useState, useCallback} from 'react'

import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement,
} from 'slate'

// Import the Slate components and React plugin.
import {Slate, Editable, withReact, useSlate} from 'slate-react'
// import {Editor as SlateEditor} from 'slate-react';
// import CodeBlockPlugin from "./plugins/codeblock/CodeBlockPlugin";
// import ImagePlugin from "./plugins/image/ImagePlugin";
// import BasicMarkPlugin from "./plugins/basicmarks/BasicMarkPlugin";
// import ListPlugin, {editListPlugin} from "./plugins/list/ListPlugin";
// import SoftBreakPlugin from "./plugins/softbreak/SoftBreakPlugin";
// import LinkPlugin from "./plugins/link/LinkPlugin";
// import VideoPlugin from "./plugins/video/VideoPlugin";
// import HeaderPlugin from "./plugins/header/HeaderPlugin";
import {isMarkActive, toggleBlock, toggleMark} from "./core/TextFormat";
import {Element, Leaf} from "./core/Render";
//
// let imagePlugin = ImagePlugin();
// let codeBlockPlugin = CodeBlockPlugin();
// let basicMarkPlugin = BasicMarkPlugin();
// let listPlugin = ListPlugin();
// let softBreakPlugin = SoftBreakPlugin();
// let linkPlugin = LinkPlugin();
// let videoPlugin = VideoPlugin();
// let headerPlugin = HeaderPlugin();

// List of plugins and toolbar ubttons can be found at:?
// https://github.com/Canner/canner-slate-editor/blob/master/packages/editors/canner-slate-editor/src/index.js
// https://github.com/Canner/canner-slate-editor/blob/master/packages/editors/canner-slate-editor/src/menuToolbar.js
let plugins = [
    // basicMarkPlugin,
    // editListPlugin,
    // codeBlockPlugin.slatePrism,
    // codeBlockPlugin.slateCodeBlock,
    // codeBlockPlugin,
    // imagePlugin,
    // listPlugin,
    // softBreakPlugin,
    // videoPlugin,
    // linkPlugin,
    // headerPlugin
];

const schema = {
    inlines: {
        image: {
            isVoid: true
        },
        youtube: {
            isVoid: true
        }
    },
};

/**
 * How to interact to GoleryEditor
 * <GoleryEditor controller=myController/>
 * MyController extends default MyController()
 *
 * GoleryEditor then populate controller with API methods (ex: toggleBold)
 * User can also add method to Controller so that GoleryEditor/Plugin can call back (ex: editImageOnPaste)
 *
 * Plugin call controller by editor.api.editImageOnPaste()
 * Read: /work/golery-editor/main/src/sandbox/index.js for example usage
 *
 *  */
const GoleryEditor = (props) => {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useSlate();
   useEffect(()=>{
           Object.assign(props.controller, {
               toggleHeader: (level) => toggleBlock(editor, 'h'+level),
       //
       //         toggleCode: () => this.editor.toggleCode("tsx"),
               insertImage: (url) => Transforms.insertNodes(editor, { type: 'image', url, children: [{ text: '' }] }),
               toggleBold: () => toggleMark(editor, 'bold'),
               toggleUnderline: () => toggleMark(editor, 'underline'),
               toggleItalic: () => toggleMark(editor, 'italic'),

               toggleList: (level) => toggleBlock(editor, 'numbered-list'),
               toggleBullet: (level) => toggleBlock(editor, 'bulleted-list'),
       //
       //         isHeader: (level) => headerPlugin.isHeader(this.editor, level),
       //         isInCodeBlock: () => codeBlockPlugin.isInCodeBlock(this.editor),
               isInBold: () => isMarkActive(editor, 'bold'),
       //         isInItalic: () =>  basicMarkPlugin.isInItalic(this.editor),
       //         isInUnderline: () => basicMarkPlugin.isInUnderline(this.editor)
           });
   }, [props.controller]);



    return (
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
            />
    );
};

export default GoleryEditor;
