import { Router } from 'express';
import { upload } from '../middlewares/multer.js';
import { superherosCollection } from '../db/models/superhero.js'; 

const router = Router();


router.patch(
  '/superheros/:id/images',
  upload.single('image'),
  async (req, res) => {
    console.log('Received PATCH request for hero ID:', req.params.id);
    console.log('Uploaded file:', req.file);

    try {
      const hero = await superherosCollection.findById(req.params.id);
      if (!hero) {
        return res.status(404).json({ message: 'Hero not found.' });
      }

      let imageUrl;


      if (req.file) {
        imageUrl = req.file.path;
      } else if (req.body.imageUrl) {
        imageUrl = req.body.imageUrl;
      }

      if (imageUrl) {
        hero.images.push(imageUrl);
        await hero.save();
        return res.json(hero);
      } else {
        return res.status(400).json({ message: 'No image uploaded.' });
      }
    } catch (error) {
      console.error('Failed to add image:', error);
      res.status(500).json({ message: 'Failed to add image.' });
    }
  }
);


router.delete('/superheros/:id/images/:index', async (req, res) => {
  try {
    const hero = await superherosCollection.findById(req.params.id);
    if (!hero) {
      return res.status(404).json({ message: 'Hero not found.' });
    }

    const index = parseInt(req.params.index);

    if (index < 0 || index >= hero.images.length) {
      return res.status(400).json({ message: 'Invalid index.' });
    }

    hero.images.splice(index, 1);
    await hero.save();

    res.json(hero);
  } catch (error) {
    console.error('Failed to remove image:', error);
    res.status(500).json({ message: 'Failed to remove image.' });
  }
});

export default router;
