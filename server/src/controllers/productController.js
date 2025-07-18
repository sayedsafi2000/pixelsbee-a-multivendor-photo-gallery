import cloudinary from '../config/cloudinary.js';
import { createProduct, getProductById, updateProduct, deleteProduct, listProductsByVendor, listAllProducts } from '../models/productModel.js';

export const uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  try {
    const result = await cloudinary.uploader.upload_stream({ folder: 'pixelsbee' }, (error, result) => {
      if (error) return res.status(500).json({ message: 'Cloudinary error', error });
      res.json({ url: result.secure_url });
    });
    req.file.stream.pipe(result);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err });
  }
};

export const create = async (req, res) => {
  const { title, description, price, image_url } = req.body;
  if (!title || !image_url) return res.status(400).json({ message: 'Title and image_url required' });
  const product = await createProduct({ vendor_id: req.user.id, title, description, price, image_url });
  res.status(201).json(product);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.vendor_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  await updateProduct(id, req.body);
  res.json({ message: 'Product updated' });
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.vendor_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  await deleteProduct(id);
  res.json({ message: 'Product deleted' });
};

export const listByVendor = async (req, res) => {
  const vendor_id = req.user.id;
  const products = await listProductsByVendor(vendor_id);
  res.json(products);
};

export const listAll = async (req, res) => {
  const products = await listAllProducts();
  res.json(products);
}; 