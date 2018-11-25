import React from 'react';

function insertImage(editor) {
    editor.command((editor) => {
        editor.insertInline({
            type: 'image',
            isVoid: true,
            data: {  ["src"]: "https://i.imgur.com/yTY1rpS.jpg" },
        }).moveToStartOfNextText().focus();
    });

    // editor.props.onChange(editor);
}

function ImagePlugin(opts) {
    return {
        renderNode: (props, editor, next) => {
            let {node, attributes} = props;
            let src = node.data.get("src");
            if (props.node.type === "image") return <img {...attributes} src={src
            }/>;
            return next();
        }
    };
}

export {insertImage};
export default ImagePlugin;
