import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from './config';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const createDbConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
    });
    console.log('Connected to MariaDB');
    return connection;
  } catch (error) {
    console.error('Error connecting to MariaDB:', error);
    process.exit(1);
  }
};

// Auth middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required',
    });
  }
  
  jwt.verify(token, config.jwt.secret, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired token',
      });
    }
    
    req.user = user;
    next();
  });
};

// Admin middleware
const isAdmin = (req: any, res: any, next: any) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Admin privileges required',
    });
  }
  
  next();
};

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Username, email, and password are required',
    });
  }
  
  try {
    const connection = await createDbConnection();
    
    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'User with this email already exists',
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const [result] = await connection.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, 'user']
    );
    
    const insertId = (result as any).insertId;
    
    // Get the created user
    const [users] = await connection.execute(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
      [insertId]
    );
    
    const user = Array.isArray(users) ? users[0] : null;
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.jwt.secret,
      { expiresIn: '7d' }
    );
    
    return res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred during registration',
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required',
    });
  }
  
  try {
    const connection = await createDbConnection();
    
    // Find user
    const [users] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }
    
    const user = users[0];
    
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }
    
    // User data to return (exclude password)
    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.created_at,
    };
    
    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.jwt.secret,
      { expiresIn: '7d' }
    );
    
    return res.status(200).json({
      success: true,
      user: userData,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred during login',
    });
  }
});

app.get('/api/auth/me', authenticateToken, async (req: any, res) => {
  try {
    const connection = await createDbConnection();
    
    const [users] = await connection.execute(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
      [req.user.id]
    );
    
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    
    const user = users[0];
    
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred',
    });
  }
});

// Character routes
app.get('/api/characters', authenticateToken, async (req: any, res) => {
  try {
    const connection = await createDbConnection();
    
    const [characters] = await connection.execute(
      'SELECT * FROM characters WHERE user_id = ? ORDER BY updated_at DESC',
      [req.user.id]
    );
    
    // Convert snake_case to camelCase
    const formattedCharacters = Array.isArray(characters) ? characters.map((char: any) => ({
      id: char.id,
      userId: char.user_id,
      name: char.name,
      heritage: char.heritage,
      calling: char.calling,
      level: char.level,
      experience: char.experience,
      biography: char.biography,
      imageUrl: char.image_url,
      createdAt: char.created_at,
      updatedAt: char.updated_at,
    })) : [];
    
    return res.status(200).json({
      success: true,
      data: formattedCharacters,
    });
  } catch (error) {
    console.error('Get characters error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred',
    });
  }
});

app.get('/api/characters/:id', authenticateToken, async (req: any, res) => {
  try {
    const connection = await createDbConnection();
    
    const [characters] = await connection.execute(
      'SELECT * FROM characters WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    
    if (!Array.isArray(characters) || characters.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Character not found or access denied',
      });
    }
    
    const char = characters[0];
    
    // Convert snake_case to camelCase
    const formattedCharacter = {
      id: char.id,
      userId: char.user_id,
      name: char.name,
      heritage: char.heritage,
      calling: char.calling,
      level: char.level,
      experience: char.experience,
      biography: char.biography,
      imageUrl: char.image_url,
      createdAt: char.created_at,
      updatedAt: char.updated_at,
    };
    
    return res.status(200).json({
      success: true,
      data: formattedCharacter,
    });
  } catch (error) {
    console.error('Get character error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred',
    });
  }
});

app.post('/api/characters', authenticateToken, async (req: any, res) => {
  const { name, heritage, calling, biography, imageUrl } = req.body;
  
  if (!name || !heritage || !calling) {
    return res.status(400).json({
      success: false,
      error: 'Name, heritage, and calling are required',
    });
  }
  
  try {
    const connection = await createDbConnection();
    
    const [result] = await connection.execute(
      `INSERT INTO characters (
        user_id, name, heritage, calling, level, experience, biography, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, name, heritage, calling, 1, 0, biography || '', imageUrl || '']
    );
    
    const insertId = (result as any).insertId;
    
    const [characters] = await connection.execute(
      'SELECT * FROM characters WHERE id = ?',
      [insertId]
    );
    
    if (!Array.isArray(characters) || characters.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Character not found after creation',
      });
    }
    
    const char = characters[0];
    
    // Convert snake_case to camelCase
    const formattedCharacter = {
      id: char.id,
      userId: char.user_id,
      name: char.name,
      heritage: char.heritage,
      calling: char.calling,
      level: char.level,
      experience: char.experience,
      biography: char.biography,
      imageUrl: char.image_url,
      createdAt: char.created_at,
      updatedAt: char.updated_at,
    };
    
    return res.status(201).json({
      success: true,
      data: formattedCharacter,
    });
  } catch (error) {
    console.error('Create character error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred',
    });
  }
});

app.put('/api/characters/:id', authenticateToken, async (req: any, res) => {
  const { name, heritage, calling, level, experience, biography, imageUrl } = req.body;
  
  try {
    const connection = await createDbConnection();
    
    // Check if character exists and belongs to user
    const [characters] = await connection.execute(
      'SELECT * FROM characters WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    
    if (!Array.isArray(characters) || characters.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Character not found or access denied',
      });
    }
    
    // Update character
    await connection.execute(
      `UPDATE characters SET 
        name = ?, 
        heritage = ?, 
        calling = ?, 
        level = ?, 
        experience = ?, 
        biography = ?, 
        image_url = ?,
        updated_at = NOW()
      WHERE id = ?`,
      [
        name || characters[0].name,
        heritage || characters[0].heritage,
        calling || characters[0].calling,
        level || characters[0].level,
        experience !== undefined ? experience : characters[0].experience,
        biography !== undefined ? biography : characters[0].biography,
        imageUrl || characters[0].image_url,
        req.params.id,
      ]
    );
    
    // Get updated character
    const [updatedCharacters] = await connection.execute(
      'SELECT * FROM characters WHERE id = ?',
      [req.params.id]
    );
    
    if (!Array.isArray(updatedCharacters) || updatedCharacters.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Character not found after update',
      });
    }
    
    const char = updatedCharacters[0];
    
    // Convert snake_case to camelCase
    const formattedCharacter = {
      id: char.id,
      userId: char.user_id,
      name: char.name,
      heritage: char.heritage,
      calling: char.calling,
      level: char.level,
      experience: char.experience,
      biography: char.biography,
      imageUrl: char.image_url,
      createdAt: char.created_at,
      updatedAt: char.updated_at,
    };
    
    return res.status(200).json({
      success: true,
      data: formattedCharacter,
    });
  } catch (error) {
    console.error('Update character error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred',
    });
  }
});

app.delete('/api/characters/:id', authenticateToken, async (req: any, res) => {
  try {
    const connection = await createDbConnection();
    
    // Check if character exists and belongs to user
    const [characters] = await connection.execute(
      'SELECT * FROM characters WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    
    if (!Array.isArray(characters) || characters.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Character not found or access denied',
      });
    }
    
    // Delete character
    await connection.execute(
      'DELETE FROM characters WHERE id = ?',
      [req.params.id]
    );
    
    return res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    console.error('Delete character error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred',
    });
  }
});

// Admin routes
app.get('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const connection = await createDbConnection();
    
    const [users] = await connection.execute(
      'SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Admin get users error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred',
    });
  }
});

app.get('/api/admin/characters', authenticateToken, isAdmin, async (req, res) => {
  try {
    const connection = await createDbConnection();
    
    const [characters] = await connection.execute(
      `SELECT c.*, u.username 
       FROM characters c 
       JOIN users u ON c.user_id = u.id 
       ORDER BY c.updated_at DESC`
    );
    
    return res.status(200).json({
      success: true,
      data: characters,
    });
  } catch (error) {
    console.error('Admin get characters error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});