import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

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
    <div className="page">
  <header className="header">
    <h1>掲示板</h1>
  </header>

  <main className="main">
    <h2 className="title">新着スレッド</h2>
    <div className="thread-list">
      {threads.map((thread) => (
        <div key={thread.id} className="thread-card">
          {thread.title}
        </div>
      ))}
    </div>
  </main>
</div>
  );
}