import React, {useState, useEffect} from 'react';
import serverController from '../serverController';

const GetImage = (props) => {
    const [imageData, setImageData] = useState(undefined);
    let sss = ""


    useEffect(
		() => {
			async function fetchData() {
                const {data: resData} = await serverController.getImage(props.match.params.id);
                console.log(resData.data)
                sss = resData.data.toString()


                console.log(sss);
                
                setImageData(resData);
                console.log(imageData);
                
			}
			fetchData();
		},
		[]
	);

    return (
        <div className="text-center mt-5">
            <img src={{imageData}} alt="test" />
        </div>
    );
};

export default GetImage;
