import { useEffect, useState } from "react";
import axios from "axios";

//投稿一覧データー
export default function ThreadList() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    axios
      .get("https://railway.bulletinboard.techtrain.dev/threads")
      .then((res) => {
        setThreads(res.data);
      })
      .catch((err) => {
        console.error("エラー:", err);
      });
  }, []);

  return (
    <div>
      <h2>📋 投稿一覧</h2>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <strong>{thread.title}</strong>
            <p>{thread.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}