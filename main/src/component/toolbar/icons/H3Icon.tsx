
import * as React from "react"

function H3Icon(props) {
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
                d="M3 4h2v6h4V4h2v14H9v-6H5v6H3V4m12 0h4a2 2 0 012 2v10a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1h2v1h4v-4h-4v-2h4V6h-4v1h-2V6a2 2 0 012-2z"
            />
        </svg>
    )
}

export default H3Icon
