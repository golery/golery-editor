import * as React from 'react';
import {Editor as SlateEditor} from 'slate-react';
import {Value} from 'slate';
import CodeBlockPlugin from "./plugins/codeblock/CodeBlockPlugin";
import SlateCodeBlock from "golery-slate-code-block";
import {ParagraphPlugin} from "@canner/slate-icon-shared";
import SlatePrism from "golery-slate-prism";
import "./plugins/codeblock/PrismGrammars";
import {insertImage} from "./plugins/image/ImagePlugin";

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
let plugins = [
    slatePrism,
    slateCodeBlock,
    CodeBlockPlugin(null)
];

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
        });
    }

    // Render the editor.
    render() {
        return <SlateEditor value={this.state.value}
                            onChange={this.onChange}
                            plugins={plugins}
                            ref={this.ref}
                            {...this.props}
        />;
    }

    onChange = ({value}) => {
        this.setState({value})
    };

    ref = editor => {
        this.editor = editor;
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