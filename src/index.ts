import awsIot from "aws-iot-device-sdk";

const genClientId = (length: number) => {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

const randomVal = () => {
    return Math.floor(Math.random() * 51);
}

const device = new awsIot.device({
    keyPath: "/Users/pao/aws-iot-ts/src/private.key",
    certPath: "/Users/pao/aws-iot-ts/src/cert.crt",
    caPath: "/Users/pao/aws-iot-ts/src/rootCA.pem",
    clientId: genClientId(6),
    host: "asxwe0mkazfs1-ats.iot.ap-southeast-1.amazonaws.com"
});


device.on('connect', (): void => {
    console.log('connect');
    try {
        setInterval( (): void =>{
            device.publish('/site1/pump1/power/value', JSON.stringify({ msg: randomVal()}));
            device.publish('/site1/pump2/power/value', JSON.stringify({ msg: randomVal()}));
        },10000);
    }
    catch (err){
        console.log(err);
    }
});
