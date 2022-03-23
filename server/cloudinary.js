import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'hoaitan', 
    api_key: '454156776858144', 
    api_secret: 'ejpQvbJ12CJ8ujVNRt-o042doQE',
    secure: true
});

export default cloudinary;