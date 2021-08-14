import React, {useEffect} from "react";
import styles from "./ImageView.module.scss";
import {ImageViewFullScreen} from "./ImageViewFullScreen";
import {showModal} from "../../../component/modal/EditorModal";

export const ImageView = ({url}: { url: string }) => {
    if (!url) return <span>(missing url)</span>;
    const onFullScreen = async () => {
        await showModal({getBody: ({closeDialog}) => <ImageViewFullScreen closeDialog={closeDialog} url={url}/>});
    }
    useEffect(() => {
        onFullScreen()
    }, [])
    return (<div>
        <div className={styles.imageHolder}>
            <img src={url}/>
            <div className={styles.zoomButton} onClick={onFullScreen}>[&nbsp; ]</div>
        </div>
    </div>);
}