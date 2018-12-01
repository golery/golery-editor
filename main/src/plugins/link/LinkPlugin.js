import React from "react";

export default function () {
    return {
        onPaste(event, editor, next) {
            console.log("Past");
            next();
        }
    };
}
