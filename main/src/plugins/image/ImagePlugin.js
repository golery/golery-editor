import React from 'react';

function ImagePlugin(opts) {
    return {
        renderNode: (props, editor, next) => {
            let {node, attributes} = props;
            let src = node.data.get("src");
            if (props.node.type === "image") return <img {...attributes} src={src
            }/>;
            return next();
        },

        commands: {
            insertImage(editor, url) {
                if (!url) {
                    console.log("No image url");
                    return;
                }

                editor.command((editor) => {
                    editor.insertInline({
                        type: 'image',
                        isVoid: true,
                        data: {  ["src"]: url },
                    }).moveToStartOfNextText().focus();
                });
            }
        }
    };
}

export default ImagePlugin;
