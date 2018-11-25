import * as React from 'react';
import {Editor as SlateEditor} from 'slate-react';
import {Value} from 'slate';
import CodeBlockPlugin from "./plugins/codeblock/CodeBlockPlugin";
import SlateCodeBlock from "golery-slate-code-block";
import {ParagraphPlugin} from "@canner/slate-icon-shared";
import SlatePrism from "golery-slate-prism";
import "./plugins/codeblock/PrismGrammars";
import ImagePlugin, {insertImage} from "./plugins/image/ImagePlugin";

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
let plugins = [
 //   slatePrism,
  //  slateCodeBlock,
   // CodeBlockPlugin(null),
    imagePlugin
];

const schema = {
    document: {
        last: { type: 'paragraph' },
        normalize: (editor, { code, node, child }) => {
            switch (code) {
                case 'last_child_type_invalid': {
                    const paragraph = Block.create('paragraph')
                    return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
                }
            }
        },
    },
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