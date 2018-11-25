import * as React from 'react';
import {Editor as SlateEditor} from 'slate-react';
import {Value} from 'slate';
import CodeBlockPlugin from "./plugins/codeblock/CodeBlockPlugin";
import SlateCodeBlock from "golery-slate-code-block";
import {ParagraphPlugin} from "@canner/slate-icon-shared";
import SlatePrism from "golery-slate-prism";
import "./plugins/codeblock/PrismGrammars";
import ImagePlugin, {insertImage} from "./plugins/image/ImagePlugin";
import BasicMarkPlugin, {toggleBold, toggleUnderline, toggleItalic} from "./plugins/basicmarks/BasicMarkPlugin";
import ListPlugin, {toggleList, toggleBullet, editListPlugin} from "./plugins/list/ListPlugin";
import SoftBreakPlugin from "./plugins/softbreak/slate-soft-break";

import 'antd/lib/select/style/index.css';
import "prismjs/themes/prism.css";

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'for (var i = 0; i < 10; i++) {}',
                            },
                        ],
                    },
                ],
            },
        ],
    },
});

let slateCodeBlock = SlateCodeBlock({
    onlyIn: node => node.type === "code_block"
});
let slatePrism = SlatePrism({
    onlyIn: node => node.type === "code_block",
    getSyntax: node => node.data.get("syntax")
});
let imagePlugin = ImagePlugin();
let codeBlockPlugin = CodeBlockPlugin();
let basicMarkPlugin = BasicMarkPlugin();
let listPlugin = ListPlugin();
let softBreakPlugin = SoftBreakPlugin();

let plugins = [
    basicMarkPlugin,
    editListPlugin,
    slatePrism,
    slateCodeBlock,
    codeBlockPlugin,
    imagePlugin,
    listPlugin,
    softBreakPlugin
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
        value: initialValue,
    };

    constructor(props) {
        super(props);
        Object.assign(props.controller, {
            toggleCode: this._toggleCodeBlock.bind(this),
            insertImage: this._insertImage.bind(this),
            isInCodeBlock: this._isInCodeBlock.bind(this),
            toggleBold: () => toggleBold(this.editor),
            toggleUnderline: () => toggleUnderline(this.editor),
            toggleItalic: () => toggleItalic(this.editor),
            toggleList: () => this.editor.toggleList(),
            toggleBullet: () => this.editor.toggleBullet()
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
        window.EDITOR = editor;
        window.logValue = () => JSON.stringify(EDITOR.value, null, 2);
    };

    _toggleCodeBlock() {
        this.editor.setBlocks({
            data: {["syntax"]: "tsx"}
        });
        slateCodeBlock.changes.toggleCodeBlock(this.editor, 'paragraph').focus();
    }

    _isInCodeBlock() {
        return slateCodeBlock.utils.isInCodeBlock(this.editor.value);
    }

    _insertImage() {
        insertImage(this.editor);
    }
}

export default GoleryEditor;