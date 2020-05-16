import React, {useState, useCallback, useEffect } from 'react';
import serverController from '../serverController';
import {useDropzone} from 'react-dropzone'

const Image = (props) => {
    const [imageData, setImageData] = useState([]);

    let preview = imageData && imageData.map(key => {
      console.log("trya")
      // console.log(imageData[key])
      return (<img src={key[2]} alt="test" />);
    });

    // useEffect(
    //   () => {
    //     console.log("a")
          
    //   },
    //   [imageData]
    // );

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

    const onDrop = useCallback(async(acceptedFiles) => {
        let files = await getData(acceptedFiles);
        // set state: add to previous state
        setImageData(prevState => {
          let array = prevState.concat(files)
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

        function removeDuplicates(array) {
          return 
        };
        console.log(imageData)
        


        // const {data} = await serverController.addImage(files)
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/jpeg, image/png'
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
        </div>
    );
};

export default Image;