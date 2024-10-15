import { v2 as cloudinary } from 'cloudinary';
import { configuration } from "../config/config";


cloudinary.config({
    cloud_name: configuration.cloud_name,
    api_key: configuration.cloud_api_key,
    api_secret: configuration.cloud_api_secret
});


export default cloudinary