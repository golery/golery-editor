import React from 'react';

function insertImage(editor) {
    editor.command((editor) => {
        editor.insertBlock({
            type: 'image',
            data: {  ["src"]: "https://i.imgur.com/yTY1rpS.jpg" },
        }).moveToStartOfNextText();
    });

    // editor.props.onChange(editor);
}

function ImagePlugin(opts) {
    return {
        renderNode: (props, editor, next) => {
            let {node, attributes} = props;
            let src = node.data.get("src");
            console.log(attributes);
            if (props.node.type === "image") return <img {...attributes} src={src
            }/>;
            return next();
        }
    };
}

export {insertImage};
export default ImagePlugin;
