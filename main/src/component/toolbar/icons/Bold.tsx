import * as React from "react";

function BoldIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} style={{
        width: 24,
        height: 24
    }} viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 15.5H10v-3h3.5A1.5 1.5 0 0115 14a1.5 1.5 0 01-1.5 1.5m-3.5-9h3A1.5 1.5 0 0114.5 8 1.5 1.5 0 0113 9.5h-3m5.6 1.29c.97-.68 1.65-1.79 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.1 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42z" /></svg>;
}

export default BoldIcon;