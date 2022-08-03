import { useState } from "react";
import AWS from 'aws-sdk';
import "./inputField.css"

function Input() {
    const [image, setImage] = useState<any>()

    const [lowAge, setLowAge] = useState<any>()
    const [highAge, setHighAge] = useState<any>()

    const [beardValue, setBeardValue] = useState<any>()
    const [beardConfidence, setBeardConfidence] = useState<any>()

    const [eyeGlassesValue, setEyeGlassesValue] = useState<any>()
    const [eyeGlassesConfidence, setEyeGlassesConfidence] = useState<any>()

    const [eyesOpenValue, setEyesOpenValue] = useState<any>()
    const [eyesOpenConfidence, setEyesOpenConfidence] = useState<any>()

    const [genderValue, setGenderValue] = useState<any>()
    const [genderConfidence, setGenderConfidence] = useState<any>()

    const [mouthOpenValue, setMouthOpenValue] = useState<any>()
    const [mouthOpenConfidence, setMouthOpenConfidence] = useState<any>()

    const [mustacheValue, setMustacheValue] = useState<any>()
    const [mustacheConfidence, setMustacheConfidence] = useState<any>()

    const [smileValue, setSmileValue] = useState<any>()
    const [smileConfidence, setSmileConfidence] = useState<any>()

    const [sunGlassesValue, setSunGlassesValue] = useState<any>()
    const [sunGlassesConfidence, setSunGlassesConfidence] = useState<any>()

    const DetectFaces = (imageData: any) => {
        var rekognition = new AWS.Rekognition();
        var params = {
            Image: {
                Bytes: imageData
            },
            Attributes: [
                'ALL',
            ]
        };
        rekognition.detectFaces(params, function (err: any, data: any) {
            if (err) console.log(err, err.stack);
            else {
                console.log(data.FaceDetails)

                setLowAge(data.FaceDetails[0].AgeRange.Low)
                setHighAge(data.FaceDetails[0].AgeRange.High)

                setBeardValue(data.FaceDetails[0].Beard.Value.toString())
                setBeardConfidence(data.FaceDetails[0].Beard.Confidence)

                setEyeGlassesValue(data.FaceDetails[0].Eyeglasses.Value.toString())
                setEyeGlassesConfidence(data.FaceDetails[0].Eyeglasses.Confidence)

                setEyesOpenValue(data.FaceDetails[0].EyesOpen.Value.toString())
                setEyesOpenConfidence(data.FaceDetails[0].EyesOpen.Confidence)

                setGenderValue(data.FaceDetails[0].Gender.Value.toString())
                setGenderConfidence(data.FaceDetails[0].Gender.Confidence)

                setMouthOpenValue(data.FaceDetails[0].MouthOpen.Value.toString())
                setMouthOpenConfidence(data.FaceDetails[0].MouthOpen.Confidence)

                setMustacheValue(data.FaceDetails[0].Mustache.Value.toString())
                setMustacheConfidence(data.FaceDetails[0].Mustache.Confidence)


                setSmileValue(data.FaceDetails[0].Smile.Value.toString())
                setSmileConfidence(data.FaceDetails[0].Smile.Confidence)

                setSunGlassesValue(data.FaceDetails[0].Sunglasses.Value.toString())
                setSunGlassesConfidence(data.FaceDetails[0].Sunglasses.Confidence)
            }
        });
    }

    const ProcessImage = (event: any) => {
        const file: any = event.target.files[0];
        setImage( URL.createObjectURL(event.target.files[0]));
        
        AWS.config.region = 'eu-west-2' ;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc'
  })
        
  

        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e: any) {
                var image: any = null;
                var jpg = true;
                try {
                    image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);

                } catch (e) {
                    jpg = false;
                }
                if (jpg == false) {
                    try {
                        image = atob(e.target.result.split("data:image/png;base64,")[1]);
                    } catch (e) {
                        alert("Not an image file Rekognition can process");
                        return;
                    }
                }

                var length = image.length;
                var imageBytes: any = new ArrayBuffer(length);
                var ua = new Uint8Array(imageBytes);
                for (var i = 0; i < length; i++) {
                    ua[i] = image.charCodeAt(i);
                }
                DetectFaces(imageBytes);
            };
        })(file);
        reader.readAsDataURL(file);
    }

    return (
        <>
            <div className="Container">
                <div className="leftContainer">
                    <div className="inputFile">
                        <input type="file" placeholder="CLiquez ici" className="inputImage" onChange={ProcessImage}/>
                    </div>
                    <div className="Image">
                        <img title="" alt="" src={image}/>
                    </div>
                </div>

                <div className="rightContainer">
                    <div>
                        <td className="py-5 pr-5 pl-5 font-semibold">AgeRange</td>
                        <p>{lowAge}</p>
                        <p>{highAge}</p>
                    </div>
                    <div>
                        <td className="py-5 pr-5 pl-5 font-semibold">Beard</td>
                        <p>{beardValue}</p>
                        <p>{beardConfidence}</p>
                    </div>
                    <div>
                        <td className="py-5 pr-5 pl-5 font-semibold">Eyes</td>
                        <p>{eyeGlassesValue}</p>
                        <p>{eyeGlassesConfidence}</p>
                        <p>{eyesOpenValue}</p>
                        <p>{eyesOpenConfidence}</p>
                    </div>
                    <div>
                        <td className="py-5 pr-5 pl-5 font-semibold">Gender</td>
                        <p>{genderValue}</p>
                        <p>{genderConfidence}</p>
                    </div>
                    <div>
                        <td className="py-5 pr-5 pl-5 font-semibold">MouthOpen</td>
                        <p>{mouthOpenValue}</p>
                        <p>{mouthOpenConfidence}</p>
                    </div>
                    <div>
                        <td className="py-5 pr-5 pl-5 font-semibold">Mustache</td>
                        <p>{mustacheValue}</p>
                        <p>{mustacheConfidence}</p>
                    </div>
                    <div>
                        <td className="py-5 pr-5 pl-5 font-semibold">Smile</td>
                        <p>{smileValue}</p>
                        <p>{smileConfidence}</p>
                    </div>
                    <div>
                        <td className="py-5 pr-5 pl-5 font-semibold">SunGlasses</td>
                        <p>{sunGlassesValue}</p>
                        <p>{sunGlassesConfidence}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Input;