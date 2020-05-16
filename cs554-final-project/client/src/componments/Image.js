import React, {useState, useCallback, useEffect } from 'react';
import serverController from '../serverController';
import {useDropzone} from 'react-dropzone'

const Image = (props) => {
    const [imageData, setImageData] = useState([]);

    const getbase64 = async(file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => resolve([file.name, "fieldName",event.target.result]);
            reader.onerror = reject
        })
    }

    const getData = async (Files) => {
        return Promise.all(Files.map(file => getbase64(file)))
    }

    const onDrop = useCallback(async(acceptedFiles, rejectedFiles) => {
        console.log(acceptedFiles);
        
        for (let file of rejectedFiles) {
          for (let error of file.errors) {
            console.log(file.file.name + " : " + error.message)
          }
        }

        let files = await getData(acceptedFiles);
        console.log(files[0][2]);
        
        
        // set state: add to previous state
        setImageData(prevState => {
          let array = prevState.concat(files)
        //   console.log(array);
          
          // remove duplicate
          let set = new Set()
          for (let i = array.length - 1; i >= 0 ; i--) {
            if (set.has(array[i][2])){
              array.splice(i, 1);
            } else {
              set.add(array[i][2])
            }
          }
          return array
        })

        // const {data} = await serverController.addImage(files)        
    }, [])

    const removeImage = (idx) => {
      console.log(idx)
      setImageData(prevState => {
        let array = [...prevState]
        array.splice(idx, 1);
        return array;
      })
    }

    const sunmitImage = async() => {
        setImageData(prevState => {
            let array = [...prevState]
            console.log("在这里上传");
            // const {data} = await serverController.addImage(array)
          })
    }

    let preview = imageData && imageData.map((key, idx) => {
      return (
        <>
          <img src={key[2]} alt={key[0]} />
          <button data-idx={idx} onClick={() => removeImage(idx)}>remove</button>
        </>
      );
    });

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png',
        minSize: 0,
        maxSize: 5242880,
        multiple: false
    })

    return (
        <div className="text-center mt-5">
            <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Click here or drop files to upload!</p>
            }
            </div>
            {preview}
            
            <button  className="btn btn-primary" type="submit" onClick={() => sunmitImage()}>submit</button>
        </div>
    );
};

export default Image;
