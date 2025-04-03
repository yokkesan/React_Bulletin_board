export const API_BASE_URL = "https://railway.bulletinboard.techtrain.dev";

export const ENDPOINTS = {
    threads: `${API_BASE_URL}/threads`,
    posts: (threadId) => `${API_BASE_URL}/threads/${threadId}/posts`,
  };