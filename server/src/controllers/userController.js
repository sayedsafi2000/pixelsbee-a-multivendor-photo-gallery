import { 
  getUserFavorites, 
  addToFavorites, 
  removeFromFavorites, 
  isFavorite,
  addToDownloads,
  getUserDownloads
} from '../models/userModel.js';
import { getProductById } from '../models/productModel.js';

// Get user favorites
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await getUserFavorites(userId);
    res.json(favorites);
  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
};

// Add to favorites
export const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { imageId, imageData } = req.body;
    
    if (!imageId || !imageData) {
      return res.status(400).json({ message: 'Image ID and data are required' });
    }

    await addToFavorites(userId, imageId, imageData);
    res.json({ message: 'Added to favorites' });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Failed to add to favorites' });
  }
};

// Remove from favorites
export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { imageId } = req.params;
    
    await removeFromFavorites(userId, imageId);
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ message: 'Failed to remove from favorites' });
  }
};

// Check if image is favorited
export const checkFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { imageId } = req.params;
    
    const isFavorited = await isFavorite(userId, imageId);
    res.json({ isFavorite: isFavorited });
  } catch (error) {
    console.error('Error checking favorite:', error);
    res.status(500).json({ message: 'Failed to check favorite status' });
  }
};

// Get user downloads
export const getDownloads = async (req, res) => {
  try {
    const userId = req.user.id;
    const downloads = await getUserDownloads(userId);
    res.json(downloads);
  } catch (error) {
    console.error('Error getting downloads:', error);
    res.status(500).json({ message: 'Failed to fetch downloads' });
  }
};

// Add to downloads
export const addDownload = async (req, res) => {
  try {
    const userId = req.user.id;
    const { imageId, imageData } = req.body;
    if (!imageId || !imageData) {
      return res.status(400).json({ message: 'Image ID and data are required' });
    }
    // Enforce download rules
    const product = await getProductById(imageId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.price > 0) {
      // TODO: Check if user has purchased (for now, block all paid downloads)
      return res.status(403).json({ message: 'You must purchase this product to download.' });
    }
    await addToDownloads(userId, imageId, imageData);
    res.json({ message: 'Added to downloads' });
  } catch (error) {
    console.error('Error adding to downloads:', error);
    res.status(500).json({ message: 'Failed to add to downloads' });
  }
}; 