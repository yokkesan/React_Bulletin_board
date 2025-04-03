import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./styles/PostList.css";
import { ENDPOINTS } from "../const";

export default function PostList() {
  const { thread_id } = useParams();
  const location = useLocation();
  const titleFromState = location.state?.title;
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [threadTitle, setThreadTitle] = useState(titleFromState || "");

  // 投稿取得
  const fetchPosts = () => {
    axios
      .get(ENDPOINTS.posts(thread_id))
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.error("投稿取得エラー:", err);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, [thread_id]);

  // 投稿送信
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    axios
      .post(ENDPOINTS.posts(thread_id), { post: newPost })
      .then(() => {
        setNewPost("");
        fetchPosts();
      })
      .catch((err) => {
        console.error("投稿エラー:", err);
      });
  };

  return (
    <div className="post-list-page">
      <header className="header">掲示板</header>
      <Link to="/" className="back-link">← Topに戻る</Link>

      <h2>{threadTitle || "投稿一覧"}</h2>

      <div className="post-container">
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <p>{post.post}</p>
              {post.user_id && <small>user_id: {post.user_id}</small>}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="投稿しよう！"
            required
          />
          <button type="submit">投稿</button>
        </form>
      </div>
    </div>
  );
}