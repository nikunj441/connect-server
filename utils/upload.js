import {GridFsStorage} from 'multer-gridfs-storage'
import dotenv from 'dotenv'
import multer from 'multer'

dotenv.config()
 
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const storage = new GridFsStorage({
    url:`mongodb+srv://${username}:${password}@blog-app.ywb4lfr.mongodb.net/?retryWrites=true&w=majority`,
    options: {useNewUrlParser: true},
    file: (request,file)=>{
        const match = ["image/png","image/jpeg","image/jpg"]
        if(match.indexOf(file.memeType)===-1)
            return `${Date.now()}-blog-${file.originalname}`
        
        return{
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }

})

export default multer({storage})