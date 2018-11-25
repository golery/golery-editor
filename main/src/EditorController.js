class EditorController {
    // The list of icon name is in canner::packages/quill-icons/src/index.js
    getToolbarOptions() {
        let options = [
            {
                title: "Bold",
                icon: "Bold",
                onClick: () => {
                    this.toggleBold()
                },
                isActive: () => {
                    return this.isInCodeBlock()
                }
            },
            {
                title: "Italic",
                icon: "Italic",
                onClick: () => {
                    this.toggleItalic()
                },
                isActive: () => {
                    return this.isInCodeBlock()
                }
            },
            {
                title: "Underline",
                icon: "Underline",
                onClick: () => {
                    this.toggleUnderline()
                },
                isActive: () => {
                    return this.isInCodeBlock()
                }
            },
            "separator",
            {
                title: "List",
                icon: "ListOrdered",
                onClick: () => {
                    this.toggleCode()
                },
                isActive: () => {
                    return this.isInCodeBlock()
                }
            },
            {
                title: "Bullet",
                icon: "ListBullet",
                onClick: () => {
                    this.toggleCode()
                },
                isActive: () => {
                    return this.isInCodeBlock()
                }
            },
            "separator",
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

    toggleBold() {
        // to be injected by editor
    }

    toggleItalic() {
        // to be injected by editor
    }

    toggleUnderline() {
        // to be injected by editor
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