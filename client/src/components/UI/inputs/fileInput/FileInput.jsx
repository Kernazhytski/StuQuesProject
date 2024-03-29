import React, {useEffect, useState} from 'react'
import imageCompression from 'browser-image-compression';
import styles from './FileInput.module.css'

const FileInput = (props) => {
    const [drag, setDrag] = useState(false);
    const [images, setImages] = useState([])
    const [URLimages, setURLimages] = useState([])
    const [flag, setFlag] = useState(true)

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920
    }

    function clearImages() {
        setImages([])
        setURLimages([])
        setFlag(true)
    }

    function dragStartHandler(e) {
        e.preventDefault();
        setDrag(true)
    }

    function dragLeaveHandler(e) {
        e.preventDefault();
        setDrag(false)
    }


    async function compr(files) {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920
        }



        const finalFiles = []

        for(var i=0;i<files.length;i++){
            try {
                const compressedFile = await imageCompression(files[i], options);
                finalFiles.push(compressedFile)
            } catch (error) {
                console.log(error);
            }
        }

        setImages(finalFiles)
    }

    function onDropHandler(e) {
        e.preventDefault();
        let copy = Object.assign([], images);
        let add = [...e.dataTransfer.files];
        if (images.length + add.length > 3) {
            setFlag(false)
        } else {
            setFlag(true)
            add.forEach(img => copy.push(img))
            setImages(copy);
        }
        setDrag(false)

        console.log(images)
        props.update(images);
    }

    const ImageGet = (e) => {
        e.preventDefault();
        let copy = Object.assign([], images);
        let add = [...e.target.files];
        if (images.length + add.length > 3) {
            setFlag(false)
        } else {
            setFlag(true)
            add.forEach(img => copy.push(img))
            setImages(copy);
        }
    }

    useEffect(() => {
        if (images.length < 1 || images.length > 3) return;
        const newImageURLS = [];
        images.forEach((image) => newImageURLS.push(URL.createObjectURL(image)));
        setURLimages(newImageURLS);

        console.log(images)
        props.update(images);
    }, [images])

    return (
        <div className={styles.cont}>
            <input id={styles.fileInput} type='file' multiple onChange={e => ImageGet(e)}/>
            {drag ? <label className={styles.labelInpAct}
                           htmlFor={styles.fileInput}
                           accept='image/*'
                           onDragStart={e => dragStartHandler(e)}
                           onDragLeave={e => dragLeaveHandler(e)}
                           onDragOver={e => dragStartHandler(e)}
                           onDrop={e => onDropHandler(e)}
            >
                <p className={styles.text}>Прикрепить фотографии</p>
                <p className={styles.text2}>Максимум 3</p>
            </label> : <label className={styles.labelInp}
                              htmlFor={styles.fileInput}
                              accept='image/*'
                              onDragStart={e => dragStartHandler(e)}
                              onDragLeave={e => dragStartHandler(e)}
                              onDragOver={e => dragStartHandler(e)}
            >
                <p className={styles.text}>Прикрепить фотографии</p>
                <p className={styles.text2}>Максимум 3</p>
            </label>
            }
            {
                URLimages.map((imageSRC, index) => <img key={index} src={imageSRC} className={styles.imgs}/>)
            }
            {images.length > 0 && <div className={styles.knopkaDel} onClick={clearImages}></div>}
            <label className={styles.label_error} hidden={flag}> Достигнут лимит картинок</label>
        </div>
    )
}

export default FileInput