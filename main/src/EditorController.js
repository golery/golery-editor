class EditorController {
    // The list of icon name is in canner::packages/quill-icons/src/index.js
    getToolbarOptions() {
        let options = [
            {
                title: "Code",
                icon: "CodeBlock",
                onClick: () => {
                    this.toggleCode()
                },
                isActive: () => {
                    return this.isInCodeBlock()
                }
            },
            {
                title: "Image",
                icon: "Image",
                onClick: () => {
                    this.insertImage()
                },
                isActive: () => {
                    return this.isInCodeBlock()
                }
            }
        ];
        return options;
    }


    toggleCode() {
        // to be injected by editor
    }

    insertImage() {
        // to be injected by editor
    }

    isInCodeBlock() {
        // to be injected by editor
        return false;
    }
}

export default EditorController;