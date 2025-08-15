import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

export const createUser = async (user) => {
  const { name, email, password, role, profile_pic_url } = user;
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password, role, profile_pic_url) VALUES (?, ?, ?, ?, ?)',
    [name, email, password, role || 'user', profile_pic_url || null]
  );
  return { id: result.insertId, ...user };
};

export const getUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

export const updateUserStatus = async (id, status) => {
  await pool.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
};

export const listVendors = async () => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = 'vendor' ORDER BY created_at DESC");
  return rows;
};

export const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users ORDER BY created_at DESC");
  return rows;
};

export const getUserStats = async (userId) => {
  try {
    // Get download count
    const [downloadCount] = await pool.query(
      'SELECT COUNT(*) as total_downloads FROM user_downloads WHERE user_id = ?',
      [userId]
    );

    // Get favorites count
    const [favoritesCount] = await pool.query(
      'SELECT COUNT(*) as total_favorites FROM user_favorites WHERE user_id = ?',
      [userId]
    );

    // Get member since date
    const [userInfo] = await pool.query(
      'SELECT created_at FROM users WHERE id = ?',
      [userId]
    );

    return {
      downloads: downloadCount[0].total_downloads,
      favorites: favoritesCount[0].total_favorites,
      memberSince: userInfo[0]?.created_at ? new Date(userInfo[0].created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Unknown'
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    return {
      downloads: 0,
      favorites: 0,
      memberSince: 'Unknown'
    };
  }
};

// Favorites functions
export const getUserFavorites = async (userId) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM user_favorites WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows.map(row => ({
      ...row,
      image_data: row.image_data ? JSON.parse(row.image_data) : null
    }));
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    return [];
  }
};

export const addToFavorites = async (userId, imageId, imageData) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM user_favorites WHERE user_id = ? AND image_id = ?',
      [userId, imageId]
    );
    
    if (rows.length > 0) {
      return; // Already favorited
    }
    
    await pool.query(
      'INSERT INTO user_favorites (user_id, image_id, image_data) VALUES (?, ?, ?)',
      [userId, imageId, JSON.stringify(imageData)]
    );
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw error;
  }
};

export const removeFromFavorites = async (userId, imageId) => {
  try {
    await pool.query(
      'DELETE FROM user_favorites WHERE user_id = ? AND image_id = ?',
      [userId, imageId]
    );
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw error;
  }
};

export const isFavorite = async (userId, imageId) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM user_favorites WHERE user_id = ? AND image_id = ?',
      [userId, imageId]
    );
    return rows.length > 0;
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};

// Downloads functions
export const getUserDownloads = async (userId) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM user_downloads WHERE user_id = ? ORDER BY downloaded_at DESC',
      [userId]
    );
    return rows.map(row => ({
      ...row,
      image_data: row.image_data ? JSON.parse(row.image_data) : null
    }));
  } catch (error) {
    console.error('Error fetching user downloads:', error);
    return [];
  }
};

export const addToDownloads = async (userId, imageId, imageData) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM user_downloads WHERE user_id = ? AND image_id = ?',
      [userId, imageId]
    );
    
    if (rows.length > 0) {
      // Update existing download timestamp
      await pool.query(
        'UPDATE user_downloads SET downloaded_at = NOW() WHERE user_id = ? AND image_id = ?',
        [userId, imageId]
      );
    } else {
      // Add new download
      await pool.query(
        'INSERT INTO user_downloads (user_id, image_id, image_data) VALUES (?, ?, ?)',
        [userId, imageId, JSON.stringify(imageData)]
      );
    }
  } catch (error) {
    console.error('Error adding to downloads:', error);
    throw error;
  }
};

// Vendor stats functions
export const getVendorStats = async (vendorId) => {
  try {
    // Get product count
    const [productCount] = await pool.query(
      'SELECT COUNT(*) as total_products FROM products WHERE vendor_id = ? AND status = "active"',
      [vendorId]
    );

    // Get total downloads (sales)
    const [downloadCount] = await pool.query(
      'SELECT COUNT(*) as total_downloads FROM user_downloads ud JOIN products p ON ud.image_id = p.id WHERE p.vendor_id = ?',
      [vendorId]
    );

    // Get average rating (mock for now - you can add rating system later)
    const [ratingResult] = await pool.query(
      'SELECT AVG(4.5) as avg_rating FROM products WHERE vendor_id = ? AND status = "active"',
      [vendorId]
    );

    // Get total earnings (mock for now - you can add payment system later)
    const [earningsResult] = await pool.query(
      'SELECT COUNT(*) * 2.99 as total_earnings FROM user_downloads ud JOIN products p ON ud.image_id = p.id WHERE p.vendor_id = ?',
      [vendorId]
    );

    // Get member since date
    const [userInfo] = await pool.query(
      'SELECT created_at FROM users WHERE id = ?',
      [vendorId]
    );

    return {
      products: productCount[0].total_products,
      sales: downloadCount[0].total_downloads,
      rating: ratingResult[0].avg_rating || 4.5,
      earnings: earningsResult[0].total_earnings || 0,
      memberSince: userInfo[0]?.created_at ? new Date(userInfo[0].created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Unknown'
    };
  } catch (error) {
    console.error('Error getting vendor stats:', error);
    return {
      products: 0,
      sales: 0,
      rating: 4.5,
      earnings: 0,
      memberSince: 'Unknown'
    };
  }
};

// Admin platform stats functions
export const getPlatformStats = async () => {
  try {
    // Get total users
    const [userCount] = await pool.query(
      'SELECT COUNT(*) as total_users FROM users WHERE role = "user"'
    );

    // Get total vendors
    const [vendorCount] = await pool.query(
      'SELECT COUNT(*) as total_vendors FROM users WHERE role = "vendor"'
    );

    // Get total products
    const [productCount] = await pool.query(
      'SELECT COUNT(*) as total_products FROM products WHERE status = "active"'
    );

    // Get total revenue (mock for now)
    const [revenueResult] = await pool.query(
      'SELECT COUNT(*) * 2.99 as total_revenue FROM user_downloads'
    );

    return {
      totalUsers: userCount[0].total_users,
      totalVendors: vendorCount[0].total_vendors,
      totalProducts: productCount[0].total_products,
      totalRevenue: revenueResult[0].total_revenue || 0
    };
  } catch (error) {
    console.error('Error getting platform stats:', error);
    return {
      totalUsers: 0,
      totalVendors: 0,
      totalProducts: 0,
      totalRevenue: 0
    };
  }
}; 

// Cart functions
export const getCart = async (userId) => {
  const [rows] = await pool.query(
    `SELECT uc.product_id, uc.quantity, p.title, p.price, p.image_url, p.vendor_id FROM user_carts uc
     JOIN products p ON uc.product_id = p.id WHERE uc.user_id = ?`,
    [userId]
  );
  return rows;
};

export const addToCart = async (userId, productId, quantity = 1) => {
  // If already in cart, update quantity
  const [rows] = await pool.query(
    'SELECT * FROM user_carts WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );
  if (rows.length > 0) {
    await pool.query(
      'UPDATE user_carts SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
      [quantity, userId, productId]
    );
  } else {
    await pool.query(
      'INSERT INTO user_carts (user_id, product_id, quantity) VALUES (?, ?, ?)',
      [userId, productId, quantity]
    );
  }
};

export const removeFromCart = async (userId, productId) => {
  await pool.query(
    'DELETE FROM user_carts WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );
};

export const clearCart = async (userId) => {
  await pool.query(
    'DELETE FROM user_carts WHERE user_id = ?',
    [userId]
  );
}; 