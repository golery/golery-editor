class EditorController {
    getToolbarOptions() {
        let options = [
            {title: "Code", icon: "CodeBlock", onClick: () => {this.toggleCode()}}
        ];
        return options;
    }

    toggleCode() {
        // do nothing when editor was not started.
        // later the GoleryEditor will inject the method
    }
}

export default EditorController;