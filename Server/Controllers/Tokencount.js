// controllers/tokenController.js

import Tokencount from "../Models/Tokencount.js";

export const getTokenCount = async (req, res) => {
  try {
    let token = await Tokencount.findOne();
    // If token count document doesn't exist, initialize it with count 0
    if (!token) {
      token = new Tokencount({ count: 0 });
      await token.save();
    }
    res.json({ tokenCount: token.count });
  } catch (error) {
    console.error('Error fetching token count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTokenCount = async (req, res) => {
  try {
    let token = await Tokencount.findOne();
    if (!token) {
      // If token count document doesn't exist, initialize it with count 0
      token = new Tokencount({ count: 0 });
    }
    token.count += 1;
    await token.save();
    res.json({ tokenCount: token.count });
  } catch (error) {
    console.error('Error updating token count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
