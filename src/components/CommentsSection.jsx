import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../config/api';

export default function CommentsSection({ slug }) {
  const { user, addXp } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/comments/${slug}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || !user) return;
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          userId: user.id,
          authorName: user.name || "Finance Explorer", // Fallback name
          content
        })
      });
      
      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setContent('');
      addXp(20, "Left a thoughtful comment!");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-4"><div className="spinner-border text-teal spinner-border-sm"></div></div>;

  return (
    <div className="comments-section mt-5">
      <h3 className="fw-bold mb-4" style={{ fontFamily: "var(--serif)" }}>
        Community Discussion ({comments.length})
      </h3>

      {/* Comment Form */}
      <div className="card border-0 mb-5" style={{ background: "var(--cream2)", borderRadius: "var(--radius-lg)" }}>
        <div className="card-body p-4">
          {user ? (
            <form onSubmit={handleSubmit}>
              <div className="d-flex gap-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0" 
                  style={{ width: "40px", height: "40px", background: "var(--teal)", fontWeight: "bold" }}
                >
                  {(user.name || "U")[0].toUpperCase()}
                </div>
                <div className="flex-grow-1">
                  <textarea 
                    className="form-control mb-3" 
                    rows="3" 
                    placeholder="Join the discussion... (You'll earn +20 XP!)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    style={{ borderRadius: "var(--radius)", resize: "none" }}
                  ></textarea>
                  <div className="text-end">
                    <button 
                      type="submit" 
                      className="btn text-white fw-bold px-4" 
                      style={{ background: "var(--ink)", borderRadius: "var(--radius)" }}
                      disabled={submitting}
                    >
                      {submitting ? 'Posting...' : 'Post Comment'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-3">
              <p className="text-muted mb-3">You must be logged in to join the discussion and earn XP.</p>
              <Link to="/login" className="btn btn-sm text-white fw-bold px-4" style={{ background: "var(--teal)" }}>
                Log In to Comment
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="text-center text-muted py-4">
            <i className="bi bi-chat-square-text fs-1 mb-2 d-block opacity-50"></i>
            Be the first to share your thoughts!
          </div>
        ) : (
          <ul className="list-unstyled">
            {comments.map((comment) => (
              <li key={comment._id} className="mb-4">
                <div className="d-flex gap-3">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0 mt-1" 
                    style={{ width: "40px", height: "40px", background: "var(--ink3)", fontWeight: "bold" }}
                  >
                    {comment.authorName[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="d-flex align-items-baseline gap-2 mb-1">
                      <strong style={{ color: "var(--ink)" }}>{comment.authorName}</strong>
                      <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                        {new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </small>
                    </div>
                    <p className="mb-0" style={{ color: "var(--ink2)", lineHeight: "1.6" }}>
                      {comment.content}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
