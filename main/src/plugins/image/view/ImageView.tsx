import React from "react";
import styles from "./ImageView.module.scss";
import {ImageViewFullScreen} from "./ImageViewFullScreen";
import {showModal} from "../../../component/modal/Modal";

export const ImageView = ({url}: { url: string }) => {
    if (!url) return <span>(missing url)</span>;

    const onFullScreen = async () => {
        await showModal({
            getBody: ({closeModal}) => <ImageViewFullScreen closeDialog={closeModal} url={url}/>
        });
    }
    
    // useEffect(() => {
    //     onFullScreen()
    // }, [])

    return (<div>
        <div className={styles.imageHolder}>
            <img src={url} alt={url}/>
            <div className={styles.zoomButton} onClick={onFullScreen}>[&nbsp; ]</div>
        </div>
    </div>);
}