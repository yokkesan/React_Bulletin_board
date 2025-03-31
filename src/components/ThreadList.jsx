import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./styles/ThreadList.css";

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
        <div className="button-wrapper">
          <Link to="/threads/new">
            <button className="create-button">＋ 新規スレッド作成</button>
          </Link>
        </div>
  
        <h2 className="title">新着スレッド</h2>
        <div className="thread-list">
          {threads.map((thread) => (
            <Link key={thread.id} to={`/threads/${thread.id}`} className="thread-card">
              {thread.title}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}