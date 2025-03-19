const cloudinary= require("cloudinary").v2
const uploadfileToCloudinary= async(file)=>{
    cloudinary.config({
        cloud_name:"dp5cebbqx",
        api_key:"525154322779448",
        api_secret:"sWEEEETnqoqIny7P6qWolDRUuDc"
    })

    const cloudinaryResponse= await cloudinary.uploader.upload(file.path)
    return cloudinaryResponse;

}

module.exports={
    uploadfileToCloudinary
}