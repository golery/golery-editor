class EditorController {
    // The list of icon name is in https://github.com/Canner/canner-slate-editor/blob/master/packages/quill-icons/src/index.js
    getToolbarOptions({getImageUrl}) {
        let options = [
            {
                title: "Header 1 (ctrl+alt+1)",
                icon: "Header",
                onClick: () => {
                    this.toggleHeader(1)
                },
                isActive: () => {
                    return this.isHeader(1)
                }
            },
            {
                title: "Header 2 (ctrl+alt+2)",
                icon: "Header2",
                onClick: () => {
                    this.toggleHeader(2)
                },
                isActive: () => {
                    return this.isHeader(2)
                }
            },
            {
                title: "Header 3 (ctrl+alt+3)",
                icon: "Header3",
                onClick: () => {
                    this.toggleHeader(3)
                },
                isActive: () => {
                    return this.isHeader(3)
                }
            },
            "separator",
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
                    getImageUrl().then(url => this.insertImage(url));
                },
                isActive: () => {
                    return this.isInCodeBlock()
                }
            }
        ];
        return options;
    }


    isHeader(level) {
        // to be injected by editor
    }

    toggleHeader(level) {
        // to be injected by editor
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