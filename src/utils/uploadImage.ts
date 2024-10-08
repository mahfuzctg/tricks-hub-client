/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const imageHostingKey = 'c0c5035ed3e36a140cd0d5bd41fa1b8b';
const imageUploadApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`


const uploadImage = async (image: any) => {
    const res = await axios.post(imageUploadApi, 
        { image: image[0] }, 
        {
        headers: {
          'content-type' : 'multipart/form-data'
        }
      })
    //   returning direct image URL 
      return res.data.data.display_url;

}
export default uploadImage;