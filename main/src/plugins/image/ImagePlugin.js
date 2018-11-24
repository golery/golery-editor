function insertImage(editor) {
    editor
        .insertInline({
            type: "image",
            isVoid: true,
            data: {
                /*[imageSrcKey]: value,
                [imageHeightKey]: ratio ? height / ratio : height,
                [imageWidthKey]: ratio ? width / ratio : width*/
                ["src"]: "https://i.imgur.com/yTY1rpS.jpg"
            }
        })
        .moveToStartOfNextText()
        .focus();
}

export {insertImage};