import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="form-container">
      <h2>スレッドを新規作成</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="スレッドタイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button type="submit">作成</button>
      </form>
    </div>
  );
}