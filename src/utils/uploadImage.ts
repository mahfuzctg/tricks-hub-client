/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const imageHostingKey = 'c75264bec71fafabee8aec54007f1fb9';
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