// takes in list of files and list of socials to
//compare size and file format specs to
//returns fileList if check is successful
//returns errors if not


const memoizeSocialSpecs = (platforms) => {
    let specs = {
        //seconds
        minVidLength:platforms[0].min_length_video,
        maxVidLength:platforms[0].max_length_video,

        //kb
        minVidSize:platforms[0].min_size_video,
        maxVidSize:platforms[0].max_size_video,
        minImgSize:platforms[0].min_size_img,
        maxImgSize:platforms[0].max_size_img,

        //char
        minText:0,
        maxText:0,

        //list of file types accepted
        acceptedFileTypes:[]
    }

  
    //loops through platform specs
    //for max sizes returns the LOWEST max 
    //platform size
    //for min sizes returns the LOWEST
    //platform size
    for(let i = 0; i < platforms.length; i++){
        let platform = platforms[i]
        
        if(platform.max_size_video < specs.maxVidSize){
            specs.maxVidSize = platform.max_size_video
        }
        if(platform.min_size_video < specs.minVidSize){
            specs.minVidSize = platform.min_size_video
        }

        if(platform.max_length_video < specs.maxVidLength){
            specs.maxVidLength = platform.max_length_video
        }
        if(platform.min_length_video < specs.minVidLength){
            specs.minVidLength = platform.min_length_video
        }

        if(platform.max_size_img < specs.maxImgSize){
            specs.maxImgSize = platform.max_size_img
        }
        if(platform.min_size_img < specs.minImgSize){
            specs.minImgSize = platform.min_size_img
        }

        if(platform.max_text < specs.maxText){
            specs.maxText = platform.max_text
        }
        if(platform.min_text < specs.minText){
            specs.minText = platform.min_text
        }

        for(let x = 0; x < platform.file_types.length; x ++){
            let type = platform.file_types[x]
            if(!specs.acceptedFileTypes.includes(type.name)){
                specs.acceptedFileTypes.push(type.name)
            }
        }

    }

    return specs
}


const CheckFiles = (fileList, platforms, formFiles = false, specList = false) => {
    let error = {
        error:false,
        platform:false,
        file:false,
        index:false
        }

    let returnFileList = []

    if(platforms.length < 1){
        error.error="platforms required"
        return {returnFileList, error}
    }
    
    //find min and max specs for social post bodies
    //and content files
    let specs = specList
    if(!specs){
        specs = memoizeSocialSpecs(platforms)
    }


    for(let i = 0; i < fileList.length; i++){
      //file and filesize
      let file = false
      if(formFiles){
        file = fileList.item(i)  
      }
      else{
        file = fileList[i] 
      }
      let fileSize = Math.floor(file.size)
      let filePath = URL.createObjectURL(file)
      let fileExt = file.name.split('.').pop()

      if(!specs.acceptedFileTypes.includes(fileExt)){
        error.error = `Unsupported file type: ${fileExt}`
        return {returnFileList, error}
        }
      
      if( fileExt === 'mp4'){
        if(fileSize < specs.minVidSize || fileSize > specs.maxVidSize){
            error.error = `file cannot be greater than ${specs.maxVidSize}`
            error.index = i 
            error.file = file
            return {returnFileList, error}
        }

        //check for video duration
        //if(filePath.duration)
    }

    else{
        if(fileSize < specs.minImgSize || fileSize > specs.maxImgSize){
            error.error = `file cannot be greater than ${specs.maxImgSize}`
            error.index = i
            error.file = file
            return {returnFileList, error}
        }
    }

    //if passes checks return dictionary with file info
    const fileDict = {
        file:file,
        ext :fileExt,
        path:filePath
    }
    returnFileList.push(fileDict)
    
    }

    return {returnFileList, error}
}

export {memoizeSocialSpecs, CheckFiles}