// pages/api/proxy.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios({
      url: `http://your_backend_url_here${req.url}`,
      method: req.method,
      data: req.body,
      headers: req.headers,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || {});
  }
}
