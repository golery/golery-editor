import * as React from "react";

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} style={{
        width: 24,
        height: 24
    }} viewBox="0 0 24 24"><path fill="currentColor" d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3l-2 4z" /></svg>;
}

export default QuoteIcon;