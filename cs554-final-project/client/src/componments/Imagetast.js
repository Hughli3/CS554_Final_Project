import React, { useCallback } from 'react';
import serverController from '../serverController';
import {useDropzone} from 'react-dropzone'
import lrz from 'lrz';

const Imagetast = (props) => {

    function compress(
        base64,        // 源图片
        rate,          // 缩放比例
        callback       // 回调
    ) {
        //处理缩放，转格式
        var _img = new Image();
        _img.src = base64;
        _img.onload = function() {
            var _canvas = document.createElement("canvas");
            var w = this.width / rate;
            var h = this.height / rate;
            _canvas.setAttribute("width", w);
            _canvas.setAttribute("height", h);
            _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
            var base64 = _canvas.toDataURL("image/jpeg");
            _canvas.toBlob(function(blob) {
                if(blob.size > 750*1334){        //如果还大，继续压缩
                    compress(base64, rate, callback);
                }else{
                    callback(base64);
                }
            }, "image/jpeg");
        }
    }
    
    const getbase64 = async(file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => resolve([file.name, event.target.result]);
            reader.onerror = reject
        })
    }

    const getData = (Files) => {
        return Promise.all(Files.map(file => getbase64(file)))
    }

    const onDrop = useCallback(async(acceptedFiles) => {
        console.log(acceptedFiles);

        let files = await getData(acceptedFiles);

        // compress(files[0][1], 0.5, function(base64){
        //     console.log(base64);
            
        // })

        console.log(files.toString());
        
        
        // // 分个上传
        // let datas = []
        // for(let i=0; i<files.length; i++){
        //     const {data}  = await serverController.addImage([files[i]])
        //     datas.push(data)
        // }
        // console.log(datas);
        
        // 一起上传
        // const {data}  = await serverController.addImage(files)
        // console.log(data);
        
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

export default Imagetast;
