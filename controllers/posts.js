import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';


export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ error: error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        // https://restapitutorial.com/httpstatuscodes.html

        res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json({ error: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id : _id} = req.params;
    const post = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with id "' + _id + '"');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id },  { new: true });
    
    res.json(updatedPost);
    
}

export const deletePost = async (req, res) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with id "' + id + '"');

    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'ID ' +id+' has been deleted successfully'});
    /*
    await PostMessage.findByIdAndRemove(id, function (err) {
        if (err){
            console.log(err)
        }
    });
    */
    //await PostMessage.deleteById(_id);

    //console.log('DELETE POST');
    
}


export const likePost = async (req, res) => {
    const id = req.params.id;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with id "' + id + '"');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 },  { new: true });
    
    res.json(updatedPost);
    
}
