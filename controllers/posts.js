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
    // const {title, message, selectedFile, creator, tags} = req.body;
    // const newPost = new PostMessage(post);
    // console.log(post);
    const newPostMessage = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString() });
    
    try {
        // await newPost.save();
        await newPostMessage.save();

        // https://restapitutorial.com/httpstatuscodes.html

        res.status(200).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ error: error});
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
    if(!req.userId) return res.status(404).send('unauthenticated');
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with id "' + id + '"');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1) {
        post.likes.push(req.userId);
    } else{
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post,  { new: true });  ////{ likeCount: post.likeCount + 1 }
    
    res.json(updatedPost);
    
}
