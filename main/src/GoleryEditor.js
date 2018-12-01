import React from 'react';
import {Editor as SlateEditor} from 'slate-react';
import CodeBlockPlugin from "./plugins/codeblock/CodeBlockPlugin";
import ImagePlugin from "./plugins/image/ImagePlugin";
import BasicMarkPlugin from "./plugins/basicmarks/BasicMarkPlugin";
import ListPlugin, {editListPlugin} from "./plugins/list/ListPlugin";
import SoftBreakPlugin from "./plugins/softbreak/SoftBreakPlugin";
import LinkPlugin from "./plugins/link/LinkPlugin";

let imagePlugin = ImagePlugin();
let codeBlockPlugin = CodeBlockPlugin();
let basicMarkPlugin = BasicMarkPlugin();
let listPlugin = ListPlugin();
let softBreakPlugin = SoftBreakPlugin();
let linkPlugin = LinkPlugin();

let plugins = [
    basicMarkPlugin,
    editListPlugin,
    codeBlockPlugin.slatePrism,
    codeBlockPlugin.slateCodeBlock,
    codeBlockPlugin,
    imagePlugin,
    listPlugin,
    softBreakPlugin,
    linkPlugin
];

const schema = {
    inlines: {
        image: {
            isVoid: true,
        },
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
            toggleCode: () => this.editor.toggleCode("tsx"),
            insertImage: (url) => this.editor.insertImage(url),

            toggleBold: () => this.editor.toggleBold(),
            toggleUnderline: () => this.editor.toggleUnderline(),
            toggleItalic: () => this.editor.toggleItalic(),

            toggleList: () => this.editor.toggleList(),
            toggleBullet: () => this.editor.toggleBullet(),

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