import React, {useEffect, useMemo, useState, useCallback} from 'react'

import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement,
} from 'slate'

// Import the Slate components and React plugin.
import {Slate, Editable, withReact} from 'slate-react'
import {Editor as SlateEditor} from 'slate-react';
import CodeBlockPlugin from "./plugins/codeblock/CodeBlockPlugin";
import ImagePlugin from "./plugins/image/ImagePlugin";
import BasicMarkPlugin from "./plugins/basicmarks/BasicMarkPlugin";
import ListPlugin, {editListPlugin} from "./plugins/list/ListPlugin";
import SoftBreakPlugin from "./plugins/softbreak/SoftBreakPlugin";
import LinkPlugin from "./plugins/link/LinkPlugin";
import VideoPlugin from "./plugins/video/VideoPlugin";
import HeaderPlugin from "./plugins/header/HeaderPlugin";
import {toggleBlock, toggleMark} from "./core/TextFormat";
import {Element, Leaf} from "./core/Render";

let imagePlugin = ImagePlugin();
let codeBlockPlugin = CodeBlockPlugin();
let basicMarkPlugin = BasicMarkPlugin();
let listPlugin = ListPlugin();
let softBreakPlugin = SoftBreakPlugin();
let linkPlugin = LinkPlugin();
let videoPlugin = VideoPlugin();
let headerPlugin = HeaderPlugin();

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
    const editor = useMemo(() => withReact(createEditor()), []);
   useEffect(()=>{
           Object.assign(props.controller, {
               toggleHeader: (level) => toggleBlock(editor, 'heading-one'),
       //
       //         toggleCode: () => this.editor.toggleCode("tsx"),
       //         insertImage: (url) => this.editor.insertImage(url),
       //
               toggleBold: () => toggleMark(editor, 'bold'),
               toggleUnderline: () => toggleMark(editor, 'underline'),
               toggleItalic: () => toggleMark(editor, 'italic'),
       //
       //         toggleList: () => this.editor.toggleList(),
       //         toggleBullet: () => this.editor.toggleBullet(),
       //
       //         isHeader: (level) => headerPlugin.isHeader(this.editor, level),
       //         isInCodeBlock: () => codeBlockPlugin.isInCodeBlock(this.editor),
       //         isInBold: () => basicMarkPlugin.isInBold(this.editor),
       //         isInItalic: () =>  basicMarkPlugin.isInItalic(this.editor),
       //         isInUnderline: () => basicMarkPlugin.isInUnderline(this.editor)
           });
   }, [props.controller]);

    // }

    // return <SlateEditor value={this.state.value}
    //                     onChange={this.onChange}
    //                     plugins={plugins}
    //                     ref={this.ref}
    //                     schema={schema}
    //                     {...this.props}
    // />;

    // Add the initial value when setting up our state.
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{text: 'A line of text in a paragraph.'}],
        },
    ])

    console.log('Value', value);

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={newValue => setValue(newValue)}
        >
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
            />
        </Slate>
    );

    //
    // ref = editor => {
    //     this.editor = editor;
    //     if (editor != null) {
    //         editor.api = this.props.controller;
    //     } else {
    //         console.log('No editor');
    //     }
    //
    //     // for debugging purpose
    //     window.EDITOR = editor;
    //     window.logValue = () => JSON.stringify(EDITOR.value, null, 2);
    // };
};

export default GoleryEditor;
