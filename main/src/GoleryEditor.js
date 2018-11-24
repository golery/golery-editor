import * as React from 'react';
import {Editor as SlateEditor} from 'slate-react';
import {Value} from 'slate';
import CodeBlockPlugin from "./plugins/codeblockplugin/CodeBlockPlugin";
import SlateCodeBlock from "golery-slate-code-block";
import {ParagraphPlugin} from "@canner/slate-icon-shared";
import SlatePrism from "golery-slate-prism";


import Prism from 'prismjs';
import PrismJson from 'prismjs/components/prism-json';
import PrismMarkup from 'prismjs/components/prism-markup';
import PrismJsx from 'prismjs/components/prism-jsx';
import PrismTypescript from 'prismjs/components/prism-typescript';
import PrismTsx from 'prismjs/components/prism-tsx';
import PrismSql from 'prismjs/components/prism-sql';
import PrismPlsql from 'prismjs/components/prism-plsql';
import PrismScss from 'prismjs/components/prism-scss';
import PrismBash from 'prismjs/components/prism-bash';
import PrismCsharp from 'prismjs/components/prism-csharp';
import PrismJava from 'prismjs/components/prism-java';

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

let slateCodeBlockPlugin = SlateCodeBlock({
    onlyIn: node => node.type === "code_block"
});
let plugins = [
    SlatePrism({
        onlyIn: node => node.type === "code_block",
        getSyntax: node => node.data.get("syntax")
    }),
    slateCodeBlockPlugin,
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
        props.controller.toggleCode = this._toggleCodeBlock.bind(this);
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
        slateCodeBlockPlugin.changes.toggleCodeBlock(this.editor, 'paragraph').focus()
    }
}

export default GoleryEditor;