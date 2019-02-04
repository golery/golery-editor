import React from 'react';

function getFirstImageBlobUrl(pasteEvent) {
    let clipboardData = pasteEvent.clipboardData;
    if (!clipboardData) return null;
    let items = clipboardData.items;
    if (!items) return null;

    for (let i = 0; i < items.length; ++i) {
        if (items[i].kind === 'file' &&
            items[i].type.indexOf('image/') !== -1) {

            let blob = items[i].getAsFile();
            let url = window.URL || window.webkitURL;
            return url.createObjectURL(blob);
        }
    }
    return null;
}

function ImagePlugin(opts) {
    return {
        renderNode: (props, editor, next) => {
            let {node, attributes} = props;
            let src = node.data.get("src");
            if (props.node.type === "image") return <img {...attributes} src={src
            }/>;
            return next();
        },

        onPaste(event, editor, next) {
            const blobUrl = getFirstImageBlobUrl(event);
            if (blobUrl) {
                editor.api.editImageOnPaste(blobUrl).then(url => editor.insertImage(url));
            } else next();
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
