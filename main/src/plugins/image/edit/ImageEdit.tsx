import React from "react";
import {useFocused, useSelected} from "slate-react";
import styles from './ImageEdit.module.scss';

export const ImageEdit = ({url}: { url: string }) => {
    const selected = useSelected();
    const focused = useFocused();
    if (!url) return <span>(missing url)</span>;

    return (<div>
        <img src={url} alt={url} className={selected && focused ? styles.selected : ''}/>
    </div>);
}