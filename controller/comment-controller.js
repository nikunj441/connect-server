
import Comment from "../model/comment.js"

export const postComment  = async (req,res)=>{

    try {
        const comment = await new Comment(req.body)
        await comment.save()

         res.status(200).json({msg: 'Comment added successfully'})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const getAllComments = async (req,res)=>{

    try {
        let commentList = await Comment.find({postId: req.params.id})
            return res.status(200).json(commentList)
    
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

export const deleteComment = async(req,res)=>{

    try {
        let comment = await Comment.findByIdAndDelete(req.params.id)

        if(!comment)
            return res.status(404).json({msg: 'Comment not found'})
        
        return res.status(200).json({msg: 'Comment deleted successfully'})
    } catch (error) {

        return res.status(500).json({error: error.message})
    }
}