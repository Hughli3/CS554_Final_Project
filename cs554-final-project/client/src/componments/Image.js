import React, { useCallback } from 'react';
import serverController from '../serverController';
import {useDropzone} from 'react-dropzone'

const Image = (props) => {

    const getbase64 = async(file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => resolve([file.name, event.target.result]);
            reader.onerror = reject
        })
    }

    const getData = async (Files) => {
        return Promise.all(Files.map(file => getbase64(file)))
    }

    const onDrop = useCallback(async(acceptedFiles) => {
        // console.log(acceptedFiles);

        let files = await getData(acceptedFiles);
        const {data: property}  = await serverController.addImage(files)
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
        </div>
    );
};

export default Image;
