import * as React from "react"

function H1Icon(props) {
    return (
        <svg
            style={{
                width: 24,
                height: 24,
            }}
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                d="M3 4h2v6h4V4h2v14H9v-6H5v6H3V4m11 14v-2h2V6.31l-2.5 1.44V5.44L16 4h2v12h2v2h-6z"
            />
        </svg>
    )
}

export default H1Icon
