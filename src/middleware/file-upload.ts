import multer from 'multer';
import crypto from 'crypto';
const MIME_TYPE_MAP: { [key: string]: string } = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const fileUpload=multer({
    limits:{
        fileSize:5000000
    },
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'uploads/images');
        },
        filename:(req,file,cb)=>{
            const ext=MIME_TYPE_MAP[file.mimetype];
            let id=crypto.randomBytes(16).toString('hex');
            cb(null,id+'.'+ext);
        }
    }),
    fileFilter:(req,file,cb)=>{
        const isValid=!!MIME_TYPE_MAP[file.mimetype];
        let error:any=isValid?null:new Error('Invalid mime type');
        cb(error,isValid);
    }
});

export default fileUpload;