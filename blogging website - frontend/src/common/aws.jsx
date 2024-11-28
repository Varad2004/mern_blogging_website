import axios from "axios";

export const uploadImage = async (img)=>{

    let imgUrl = null;

    await axios.get(import.meta.env.VITE_SERVER_DOMAIN+"/get-upload-url")
    
    .then( async ({ data:{ uploadURL }})=>{
        console.log("Upload URL:",uploadURL);
        
        await axios({
            method:'PUT',
            url:uploadURL,
            headers:{'Content-Type':'multipart/form-data'},
            data:img
        })
        .then(()=>{
            imgUrl = uploadURL.split("?")[0]
        })  
    })
    return imgUrl;

}


// import axios from "axios";

// export const uploadImage = async (img) => {
//     let imgUrl = null;

//     try {
//         // Fetch the upload URL from the server
//         const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url");
//         console.log("Full Response:", response);
        
//         // Correctly access the upload URL
//         const { data: { upload } } = response;
//         console.log("Extracted Upload URL:", upload);

//         if (!upload) {
//             throw new Error("Failed to get upload URL");
//         }

//         // Perform the PUT request to upload the image
//         await axios({
//             method: 'PUT',
//             url: upload,
//             headers: { 'Content-Type': 'application/octet-stream' }, // Use a generic type if file type is unknown
//             data: img
//         }).then(() => {
//             console.log("Image successfully uploaded");
//             imgUrl = upload.split("?")[0];
//         });
//     } catch (error) {
//         console.error("Error uploading image:", error.message || error);
//     }

//     return imgUrl;
// };