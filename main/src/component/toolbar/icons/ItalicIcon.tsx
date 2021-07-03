import * as React from "react";

function ItalicIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} style={{
        width: 24,
        height: 24
    }} viewBox="0 0 24 24"><path fill="currentColor" d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" /></svg>;
}

export default ItalicIcon;