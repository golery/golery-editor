// Fork from canner to fix bug: new line is delete after conversion
// @flow
import React from "react";
import PluginEditCode from "slate-edit-code";
import { CODE, CODE_LINE } from "@canner/slate-constant/lib/blocks";
import ReactDOMServer from 'react-dom/server';

const NEW_LINE = "__new_line__";

// solution: add special new line text __new_line__ when serialize and then replace them by \n
// slate code edit automatically convert it to code line.
function reactToPlainText(elm) {
    let html = ReactDOMServer.renderToStaticMarkup(elm);
    let doc = new DOMParser().parseFromString(html, 'text/html');
    let text = doc.body.textContent || "";
    text = text.replace(/__new_line__/g, "\n");
    text = text.replace(/\n$/, "");
    console.log("Plaintext:", text);
    return text;
}

export default function(opt) {
  const options = Object.assign(
    {
      codeBlockType: CODE,
      codeLineType: CODE_LINE,
      getSyntax: node => node.data.get("syntax")
    },
    opt
  );

  const codePlugin = PluginEditCode({
    onlyIn: node => node.type === options.codeBlockType
  });

  return {
    deserialize(el) {
      if (el.tagName && el.tagName.toLowerCase() === "pre") {
        const cls = el.childNodes[0].className;
        const matched = cls && cls.match(/(?:lang|language)-(\w+)/);
        const codeBlockNode = codePlugin.utils.deserializeCode(el.textContent);
        if (matched) {
          const codeBlock = codeBlockNode.toJSON();
          codeBlock.data = { syntax: matched[1] };
          return codeBlock;
        }

        return codeBlockNode;
      }
    },
    serialize(obj, children) {

      if (obj.object == "block" && obj.type === options.codeLineType) {
        return <p>{children}{NEW_LINE}</p>;
      } else if (obj.object == "block" && obj.type === options.codeBlockType) {
        const syntax = options.getSyntax(obj);
        const props = {
          className: syntax && `lang-${syntax}`
        };
        return (
          <pre>
            <code {...props}>{reactToPlainText(children)}</code>
          </pre>
        );
      }
    }
  };
}
