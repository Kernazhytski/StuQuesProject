import React, { useState } from 'react'

import styles from './FileInput.module.css'

const FileInput = () => {
    const [drag, setDrag] = useState(false);

    function dragStartHeandler(e) {
      e.preventDefault();
      setDrag(true)
    }
    function dragLeaveHeandler(e) {
      e.preventDefault();
      setDrag(false)
    }
    function onDropHeandler(e) {
      e.preventDefault();
      let files = [...e.dataTransfer.files];
      console.log(files)
      setDrag(false)
    }
  return (
    <div>
        <input id={styles.fileInput} type='file' multiple />
            {drag
            ?
                <label className={styles.labelInpAct}
                    htmlFor={styles.fileInput}
                    accept='image/*'
                    onDragStart={e => dragStartHeandler(e)}
                    onDragLeave={e => dragLeaveHeandler(e)}
                    onDragOver={e => dragStartHeandler(e)}
                    onDrop={e => onDropHeandler(e)}
                >
                    Прикрепить файлы
                </label>                
                :
                <label className={styles.labelInp}
                    htmlFor={styles.fileInput}
                    accept='image/*'
                    onDragStart={e => dragStartHeandler(e)}
                    onDragLeave={e => dragStartHeandler(e)}
                    onDragOver={e => dragStartHeandler(e)}
                >
                    Прикрепить файлы
                </label>     
            }
    </div>
  )
}

export default FileInput