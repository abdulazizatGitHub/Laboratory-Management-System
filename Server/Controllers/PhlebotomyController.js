import GenToken from "../Models/GenerateToken.js";

export const getTokenDetails = async (req, res) => {
    try {
        const tokenDetails = await GenToken.find();
        res.status(200).json(tokenDetails);
    } catch (error) {
        console.error("Error fetching token details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}