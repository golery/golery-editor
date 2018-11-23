import * as React from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate';
import CodeBlockPlugin from "./plugins/codeblockplugin/CodeBlockPlugin";
import SlateCodeBlock from "golery-slate-code-block";
import { ParagraphPlugin } from "@canner/slate-icon-shared";
import SlatePrism from "golery-slate-prism";


import Prism from 'prismjs';
import PrismJava from 'prismjs/components/prism-java';
import PrismJson from 'prismjs/components/prism-json';
import PrismTsx from 'prismjs/components/prism-tsx';
import PrismJsx from 'prismjs/components/prism-jsx';
//import PrismPlsql from 'prismjs/components/prism-plsql';
import PrismScss from 'prismjs/components/prism-scss';
import PrismBash from 'prismjs/components/prism-bash';
import PrismCsharp from 'prismjs/components/prism-csharp';

import 'antd/lib/select/style/index.css';
import "prismjs/themes/prism.css";
import './main.css';

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

class App extends React.Component {
    // Set the initial value when the app is first constructed.
    state = {
        value: initialValue,
    };

    constructor(props) {
        super(props);
        props.controller.toggleCode = this._toggleCodeBlock.bind(this);
    }

    // On change, update the app's React state with the new editor value.
    onChange = ({value}) => {
        console.log(value);
        this.setState({value})
    };

    ref = editor => {
        console.log("Editor", editor);
        this.editor = editor;
    };

    // Render the editor.
    render() {

        return <div className="editor">
                <Editor value={this.state.value} onChange={this.onChange} plugins={plugins}
                        ref={this.ref}/>
            </div>;
    }

    _getEditor= () => {
        return this.editor;
    }

    _toggleCodeBlock() {
        slateCodeBlockPlugin.changes.toggleCodeBlock(this.editor, 'paragraph').focus()
    }
}

export default App;