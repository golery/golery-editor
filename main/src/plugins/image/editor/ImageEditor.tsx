import * as React from "react"
import styles from './ImageEditor.module.scss';
import {useEffect, useRef, useState} from "react";
import ClipboardUtils from "./ClipboardUtils";

const MAX_IMAGE_WIDTH = 1000;
const MAX_IMAGE_HEIGHT = 800;

export const ImageEditor = () => {
    const imageRef = useRef(new Image());
    const [hasImage, setHasImage] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [resizePercent, setResizePercent] = useState(100);
    const [imageSize, setImageSize] = useState({width: 0, height: 0});
    const onPaste = () => {
    };
    let spinnerClassName = `fa fa-spinner fa-pulse ${styles.spinner}`;
    let elmInner;

    const image = imageRef.current;
    const canvasRef = React.createRef<HTMLCanvasElement>();

    useEffect(() => {
        document.addEventListener('paste', _pasteListener);
        return () => {
            document.removeEventListener('paste', _pasteListener);
        };
    }, [_pasteListener]);

    console.log('Rs', resizePercent);

    function onResize(e) {
        let value = e.target.value;
        setResizePercent(parseFloat(value));
    }

    function _pasteListener(e) {
        e.stopPropagation();
        e.preventDefault();

        let blobUrl = ClipboardUtils.getFirstImageBlobUrl(e);
        if (!blobUrl) {
            return;
        }
        _copyToCanvas(blobUrl);
    }

    // http://stackoverflow.com/questions/18377891/how-can-i-let-user-paste-image-data-from-the-clipboard-into-a-canvas-element-in
    function _copyToCanvas(objectUrl) {
        const canvas = canvasRef.current;
        image.onload = () => {
            let size = _adjustImageSize(image.width, image.height);
            setHasImage(true);
            setImageSize(size);
            console.log('Resize to', size);
            if (!!canvas) {
                canvas.width = size.width;
                canvas.height = size.height;
            }
        };
        image.src = objectUrl;
    };

    useEffect(() => {
        if (!image.src || !image.complete) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ratio = resizePercent / 100.0;
        let size = _adjustImageSize(image.width, image.height);
        size = {width: size.width * ratio, height: size.height * ratio};
        canvas.width = size.width;
        canvas.height = size.height;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log(image.width, image.height, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

    }, [image.src, image.complete, canvasRef.current, resizePercent]);

    function _adjustImageSize(width, height) {
        let ratio = width / height;
        let w = width;
        let h = height;
        if (w >= MAX_IMAGE_WIDTH) {
            w = 1000;
            h = w / ratio;
        }
        if (h >= MAX_IMAGE_HEIGHT) {
            h = 800;
            w = h * ratio;
        }

        return {width: w, height: h};
    }

    async function onClickUploadImgur() {
        const canvas = canvasRef.current;
        console.log('x', canvasRef, canvas);
        setShowSpinner(true);
        canvas.toBlob((blob) => {
            uploadToImageShack(blob);
        });
        // canvas.toBlob((blob) => {
        //     uploadImgur(blob).then((response) => {
        //         // this.props.resolve(response.link);
        //     }).catch((e) => {
        //         console.log(e);
        //         // this.props.reject(e);
        //     });
        // });
    }

    // Not sure image shack works after 30days trial
    // Has cors issue
    async function uploadToImageShack(blob) {
        const formData = new FormData();
        formData.append('file', blob);
        const url = 'https://api.imageshack.com/v2/images?api_key=34GQSTWY5055631b2bdce7b676f0aa5ec913f7f7';
        const response = await fetch(url, {
                method: 'POST', body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }
        );
        console.log('R', response);
    }

// Key: 34GQSTWY5055631b2bdce7b676f0aa5ec913f7f7
    /*
            let dataUrl = canvas.toDataURL('image/jpeg');
            let imageBase64 = dataUrl.substring('data:image/png;base64,'.length);
            Does not work. Imgur return invalid CORS header. It need Authorization header, but allows all domain.
            Chrome blocks request.
     */
    // async function uploadImgur(base64) {
    //     const url = 'https://api.imgur.com/3/image';
    //     const formData = new FormData();
    //     formData.append('image', 'abc123');
    //     const response = await fetch(url, {
    //             method: 'POST', body: base64,
    //             credentials: 'include',
    //             headers: {
    //                 'Authorization': "Client-ID 4b49385f955770a",
    //                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //             }
    //         }
    //     );
    //     console.log('R', response);
    // }
    //

    // Need authentication. Does not work at local
    //  canvas.toBlob((blob)
    // async function uploadImgurViaPencil(blob) {
    //     let url = '/api/pencil/image/imgur';
    //
    //     const response = await fetch(url, {
    //         method: 'POST', body: blob, headers: {
    //             'Content-Type': 'application/octet-stream'
    //         }
    //     });
    //     const json = await response.json();
    //     console.log(json);
    //     return json;
    // }


    if (hasImage) {
        let canvassHolderStyle = imageSize;
        elmInner = <div>
            <div>
                <div className={styles.button} onClick={onClickUploadImgur}><i
                    className="fa fa-cloud-upload"/>
                    &nbsp; Upload to Imugr.com**
                </div>
                <div className={styles.button} onClick={onClickUploadImgur}><i
                    className="fa fa-cloud-upload"/>
                    &nbsp; Upload to Golery.com
                </div>
                <div className={styles.igmurWarning}>**Imgur.com is free public image hosting. Even if your note content
                    is set to private access, image are still accessible from public.
                </div>
                <div>
                    <input className={styles.resizeSlider} type="range" value={resizePercent}
                           onChange={(e) => onResize(e)}/>
                </div>
            </div>
            <div style={canvassHolderStyle}>
                <canvas ref={canvasRef}/>
            </div>
        </div>;
    } else {
        elmInner = <div>
            <div className={styles.textControlV}>Ctrl + V</div>
            <div className={styles.textPasteFromClipboard}>
                <span className={styles.textPaste}>Paste</span> from your clipboard.
            </div>
        </div>
    }
    let elmSpinner = showSpinner &&
        <div className={styles.spinnerHolder}><i className={spinnerClassName}/>
        </div>;
    return <div className={styles.component} onPaste={onPaste}>
        {elmInner}
        {elmSpinner}
    </div>;
}