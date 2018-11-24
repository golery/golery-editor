class EditorController {
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
            }
        ];
        return options;
    }

    toggleCode() {
        // do nothing when editor was not started.
        // later the GoleryEditor will inject the method
    }

    isInCodeBlock() {
        return false;
    }
}

export default EditorController;