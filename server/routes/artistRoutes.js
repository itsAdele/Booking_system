
const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', artistController.getAllArtists);
router.post('/', protect, isAdmin, artistController.createArtist);


router.get('/me', protect, artistController.getMe);


router.get('/:id', artistController.getArtistById);

router.get('/:id/portfolio', artistController.getArtistPortfolio);
router.post('/:id/upload', protect, upload.single('image'), artistController.uploadPortfolioImage);
router.delete('/:id/portfolio/:index', protect, artistController.deletePortfolioImage);

module.exports = router;