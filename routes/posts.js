import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likepost', likePost);
/*router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.json({message: 'ID ' +id+' Post Deleted Successfully'});
    /*
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });*/

export default router;