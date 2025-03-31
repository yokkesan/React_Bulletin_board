import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./styles/PostList.css";

export default function PostList() {
  const { thread_id } = useParams();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [threadTitle, setThreadTitle] = useState("");

  // 投稿一覧を取得
  const fetchPosts = () => {
    axios
      .get(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.error("投稿取得エラー:", err);
      });
  };

  // useEffectで投稿一覧とタイトル取得
  useEffect(() => {
    fetchPosts();

    // スレッド一覧から対応するタイトルを探す
    axios
      .get("https://railway.bulletinboard.techtrain.dev/threads")
      .then((res) => {
        const thread = res.data.find((t) => t.id === thread_id);
        if (thread) {
          setThreadTitle(thread.title);
        }
      })
      .catch((err) => {
        console.error("タイトル取得エラー:", err);
      });
  }, [thread_id]);

  // 投稿フォームの送信
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    axios
      .post(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
        post: newPost,
      })
      .then(() => {
        setNewPost("");
        fetchPosts(); // 投稿後に再取得して即反映
      })
      .catch((err) => {
        console.error("投稿エラー:", err);
      });
  };

  return (
    <div className="post-list-page">
      <header className="post-header">
      <header className="header">掲示板</header>
        <Link to="/" className="back-link">← Topに戻る</Link>
      </header>

      <h2>{threadTitle || "投稿一覧"}</h2>

      <div className="post-container">
        {/* 投稿一覧 */}
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <p>{post.post}</p>
              {post.user_id && <small>user_id: {post.user_id}</small>}
            </div>
          ))}
        </div>

        {/* 投稿フォーム */}
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