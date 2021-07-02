import * as React from "react";

function UnderlineIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} style={{
        width: 24,
        height: 24
    }} viewBox="0 0 24 24"><path fill="currentColor" d="M5 21h14v-2H5v2m7-4a6 6 0 006-6V3h-2.5v8a3.5 3.5 0 01-3.5 3.5A3.5 3.5 0 018.5 11V3H6v8a6 6 0 006 6z" /></svg>;
}

export default UnderlineIcon;