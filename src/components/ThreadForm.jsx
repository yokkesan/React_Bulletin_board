import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./styles/ThreadForm.css";

export default function ThreadForm() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {e.preventDefault();

    axios.post("https://railway.bulletinboard.techtrain.dev/threads", {
      title: title
    })
    .then(() => {
      navigate("/");
    })
    .catch((err) => {
      console.error("スレッド作成エラー", err);
    });
  };

  return (
    <div className="create-thread-page">
  <header className="create-thread-header">掲示板</header>

  <div className="create-thread-container">
    <h2>スレッド新規作成</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="スレッドタイトル"
        required
      />
      <Link to="/" className="back-link">Topに戻る</Link>
      <button type="submit">作成</button>
    </form>
  </div>
</div>
  );
}