import PluginEditCode from "golery-slate-code-block";
import {CODE, CODE_LINE, PARAGRAPH} from "@canner/slate-constant/lib/blocks";
import {codeBlockNode, codeLineNode} from "../../canner/renderer/codeBlockNode";
// This key/values comes from "prismjs/components.js".
// There are more values.
import languages from "./languages.json";
import isHotkey from "is-hotkey";

const CodeBlockPlugin = opt => {
    const options = Object.assign(
        {
            codeType: CODE,
            codeLineType: CODE_LINE,
            getSyntax: node => node.data.get("syntax"),
            languages: languages
        },
        opt
    );

    return {
        renderNode(props, editor, next) {
            if (props.node.type === options.codeType) {
                return codeBlockNode(options)(props);
            } else if (props.node.type === options.codeLineType) {
                return codeLineNode()(props);
            } else
                return next();
        },

        onKeyDown(event, editor, next) {
            if (isHotkey("ctrl+/", event)) {
                event.preventDefault();
                editor.toggleCode("tsx");
                return;
            } else return next();
        },

        commands: {
            toggleCode(editor, language) {
                let typeName = CODE;
                let codePlugin = PluginEditCode({
                    onlyIn: node => node.type === typeName
                });

                let syntaxKey = "syntax";
                let haveCodeBlock = codePlugin.utils.isInCodeBlock(editor.value);

                if (haveCodeBlock) {
                    codePlugin.changes.unwrapCodeBlock(editor, PARAGRAPH);
                } else {
                    let newChange = editor.setBlocks({
                        data: {[syntaxKey]: language}
                    });

                   codePlugin.changes.wrapCodeBlock(newChange);
                }
            }
        }
    };
};

export default CodeBlockPlugin;


