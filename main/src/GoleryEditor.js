import React from 'react';
import {Editor as SlateEditor} from 'slate-react';
import CodeBlockPlugin from "./plugins/codeblock/CodeBlockPlugin";
import ImagePlugin from "./plugins/image/ImagePlugin";
import BasicMarkPlugin from "./plugins/basicmarks/BasicMarkPlugin";
import ListPlugin, {editListPlugin} from "./plugins/list/ListPlugin";
import SoftBreakPlugin from "./plugins/softbreak/SoftBreakPlugin";
import LinkPlugin from "./plugins/link/LinkPlugin";
import VideoPlugin from "./plugins/video/VideoPlugin";
import HeaderPlugin from "./plugins/header/HeaderPlugin";

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
    basicMarkPlugin,
    editListPlugin,
    codeBlockPlugin.slatePrism,
    codeBlockPlugin.slateCodeBlock,
    codeBlockPlugin,
    imagePlugin,
    listPlugin,
    softBreakPlugin,
    videoPlugin,
    linkPlugin,
    headerPlugin
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

/** A pack of plugins for Golery Editor */
class GoleryEditor extends React.Component {
    // Set the initial value when the app is first constructed.
    state = {
        value: null,
    };

    constructor(props) {
        super(props);
        Object.assign(props.controller, {
            toggleHeader: (level) => this.editor.toggleHeader(level),

            toggleCode: () => this.editor.toggleCode("tsx"),
            insertImage: (url) => this.editor.insertImage(url),

            toggleBold: () => this.editor.toggleBold(),
            toggleUnderline: () => this.editor.toggleUnderline(),
            toggleItalic: () => this.editor.toggleItalic(),

            toggleList: () => this.editor.toggleList(),
            toggleBullet: () => this.editor.toggleBullet(),

            isHeader: (level) => headerPlugin.isHeader(this.editor, level),
            isInCodeBlock: () => codeBlockPlugin.isInCodeBlock(this.editor),
            isInBold: () => basicMarkPlugin.isInBold(this.editor),
            isInItalic: () =>  basicMarkPlugin.isInItalic(this.editor),
            isInUnderline: () => basicMarkPlugin.isInUnderline(this.editor)
        });
    }

    // Render the editor.
    render() {
        return <SlateEditor value={this.state.value}
                            onChange={this.onChange}
                            plugins={plugins}
                            ref={this.ref}
                            schema={schema}
                            {...this.props}
        />;
    }

    onChange = ({value}) => {
        this.setState({value})
    };

    ref = editor => {
        this.editor = editor;
        // for debugging purpose
        window.EDITOR = editor;
        window.logValue = () => JSON.stringify(EDITOR.value, null, 2);
    };

    _insertImage() {
        insertImage(this.editor);
    }
}

export default GoleryEditor;