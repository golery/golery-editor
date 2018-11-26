class EditorController {
    // The list of icon name is in canner::packages/quill-icons/src/index.js
    getToolbarOptions() {
        let options = [
            {
                title: "Bold (ctrl+b)",
                icon: "Bold",
                onClick: () => {
                    this.toggleBold()
                },
                isActive: () => {
                    return this.isInBold()
                }
            },
            {
                title: "Italic (ctrl+i)",
                icon: "Italic",
                onClick: () => {
                    this.toggleItalic()
                },
                isActive: () => {
                    return this.isInItalic()
                }
            },
            {
                title: "Underline (ctrl+u)",
                icon: "Underline",
                onClick: () => {
                    this.toggleUnderline()
                },
                isActive: () => {
                    return this.isInUnderline()
                }
            },
            "separator",
            {
                title: "List",
                icon: "ListOrdered",
                onClick: () => {
                    this.toggleList()
                },
                isActive: () => {
                    return this.isInCodeBlock()
                }
            },
            {
                title: "Bullet",
                icon: "ListBullet",
                onClick: () => {
                    this.toggleBullet()
                },
                isActive: () => {
                    return this.isInCodeBlock()
                }
            },
            "separator",
            {
                title: "Code (ctrl+/)",
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


    isInBold() {
        // to be injected by editor
    }

    toggleBold() {
        // to be injected by editor
    }

    isInItalic() {
        // to be injected by editor
    }

    toggleItalic() {
        // to be injected by editor
    }

    isInUnderline() {
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
    }

    toggleList() {
        // to be injected by editor
    }

    toggleBullet() {
        // to be injected by editor
    }
}

export default EditorController;