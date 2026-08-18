import Interaction from '../models/Interaction.js';
import Reel from '../models/Reel.js';

/**
 * Log or update user interaction with a Reel
 */
export const logInteraction = async (req, res) => {
  try {
    const { reelId, interactionType, watchedPercent } = req.body;
    const userId = req.user.id;

    if (!reelId || !interactionType) {
      return res.status(400).json({ message: "Reel ID and interaction type are required" });
    }

    // Verify Reel exists
    const reel = await Reel.findById(reelId);
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    // Create the interaction log
    const interaction = await Interaction.create({
      userId,
      reelId,
      interactionType,
      watchedPercent: watchedPercent || 0
    });

    res.status(201).json({
      message: "Interaction logged successfully",
      interaction
    });
  } catch (error) {
    console.error("Error logging interaction:", error);
    res.status(500).json({ message: "Server error while logging interaction" });
  }
};
