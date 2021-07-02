import * as React from "react";

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} style={{
        width: 24,
        height: 24
    }} viewBox="0 0 24 24"><path fill="currentColor" d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z" /></svg>;
}

export default CodeIcon;