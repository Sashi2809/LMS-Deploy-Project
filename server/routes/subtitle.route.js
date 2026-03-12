import express from 'express';
import axios from 'axios';

const router = express.Router();
const FLASK_SERVICE = "http://localhost:5000"; // Flask service URL

router.post('/generate', async (req, res) => {
  try {
    const { videoUrl } = req.body;
    
    // Forward to Flask service
    const response = await axios.post(`${FLASK_SERVICE}/upload`, {
      video: videoUrl
    });

    res.status(200).json({
      subtitlesUrl: response.data.subtitles_url,
      videoUrl: response.data.video_url
    });
    
  } catch (error) {
    console.error('Subtitle generation error:', error);
    res.status(500).json({ message: "Subtitle generation failed" });
  }
});

export default router;