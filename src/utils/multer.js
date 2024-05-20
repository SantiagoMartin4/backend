import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadFolder;
        console.log('Executing multer diskStorage destination function');
        switch (file.fieldname) {
            case 'profile_image':
                uploadFolder = 'uploads/profiles/';
                break;
            case 'product_image':
                uploadFolder = 'uploads/products/';
                break;
            case 'identification':
            case 'proof_of_address':
            case 'bank_statement':
                uploadFolder = 'uploads/documents/';
                break;
            default:
                console.error('Invalid fieldname:', file.fieldname);
                return cb(new Error('Invalid fieldname'), false);
        }
        console.log(`Saving file ${file.originalname} to folder ${uploadFolder}`);
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname;
        console.log(`Generated filename: ${fileName}`);
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    console.log('Executing multer fileFilter function');
    const fileTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        console.log(`File ${file.originalname} passed fileFilter`);
        return cb(null, true);
    } else {
        console.error('Unsupported file type:', file.originalname);
        cb(new Error('Unsupported file type'), false);
    }
};

export const multerUploader = multer({ 
    storage, 
    fileFilter 
});