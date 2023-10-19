import { S3Client, CreateMultipartUploadCommand, S3, PutObjectCommand} from "@aws-sdk/client-s3"
import { Upload } from "@aws-sdk/lib-storage"

const S3Bucket = process.env.REACT_APP_AWS_BUCKET_NAME
const S3Url = process.env.REACT_APP_AWS_S3_CUSTOM_URL
const S3Dir = process.env.REACT_APP_S3_MEDIA_DIR_NAME
const S3Credentials = {
    accessKeyId : process.env.REACT_APP_AWS_S3_ACCESS_KEY,
    secretAccessKey  : process.env.REACT_APP_AWS_S3_SECRET_KEY,
    bucketName : process.env.REACT_APP_AWS_BUCKET_NAME,
    dirName : process.env.REACT_APP_AWS_FILE_UPLOAD_PATH,
    Region : process.env.REACT_APP_AWS_REGION,
}

const S3ClientConfig = {
    region: process.env.REACT_APP_AWS_REGION,
    credentials : S3Credentials
}


//upload files larger than 5mb to s3 bucket
const S3MultipartUpload = async (file, key, client) => {
        const parallelUpload = new Upload({
        client : client,
        params : { Bucket: S3Bucket, Key : key, Body: file, dirName:S3Dir },
        tags : [],
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError:true
    })

    parallelUpload.on("httpUploadProgress", (progress) => {
        console.log(progress);
      })

    await parallelUpload.done()
}


//upload files smaller than 5mb to s3 bucket
const S3SingleFileUpload = async (file, key, client) => {
    //let upload = S3.ManageUpload({
            //let promise = upload.promise()
    let input_params = { Bucket: S3Bucket, Key : key, Body: file }

    const command = new PutObjectCommand(input_params)
    const response = await client.send(command)
    console.log(response)
}

//uploads all files in a list and returns file keys
// (s3 bucket url paths) or any errors while uploading files
//return {keyList : [...keys], errors : "upload errors"}

const S3UploadFiles = async (files) => {
    // max single upload size is 5mb
    const maxSingleUploadSize = 5242880 
    const keyList = []
    
    for(let i = 0; i < files.length; i ++){
        //try{
            //create a unique key to make sure there are no
            //duplicates in the s3 bucket
            let random = Math.floor(Math.random() * 100) + 90 + Math.floor(Math.random() * 100)
            let key = `${random}_${random}_${files[i].name}`.replace(/\s/g, '')
            let key_path = `${S3Dir}/${key}`
            console.log(key_path)
            //if files are less than 5 mb
            if(files[i].size  > maxSingleUploadSize){
                let client = S3Client(S3ClientConfig) || S3(S3ClientConfig)
                await S3MultipartUpload(files[i], key_path, client)
            }
            //if files are greater than 5mb
            else{
                console.log('single upload')
                let client = new S3Client(S3ClientConfig)
                await S3SingleFileUpload(files[i], key_path, client)
            }

            //format object to match db object
            //let kb = Math.floor(Math.log(files[i].size) / Math.log(1000));
            //let size = parseFloat((files[i].size / Math.pow(1000), kb)).toFixed(2)
            //let keyUrl = `${S3Url}/${key}`
            let keyUrl = key
            keyList.push(keyUrl)
            console.log(keyList)
        //}
        //catch{
         //   return {keyList:[], errors:"Error uploading files, try again later"}
       // }
    }

    return {keyList:keyList, errors:false}
}   


export {S3UploadFiles,S3MultipartUpload, S3SingleFileUpload}