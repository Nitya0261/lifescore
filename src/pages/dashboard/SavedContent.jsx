import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/api';

export default function SavedContent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchBookmarks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/bookmarks/${user.id}`);
        const data = await res.json();
        setBookmarks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, [user, navigate]);

  const removeBookmark = async (id) => {
    try {
      // Find the bookmark to get the slug for the toggle endpoint
      const bookmark = bookmarks.find(b => b._id === id);
      if (!bookmark) return;

      await fetch(`${API_BASE_URL}/api/bookmarks/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          itemType: bookmark.itemType,
          title: bookmark.title,
          slug: bookmark.slug
        })
      });
      
      setBookmarks(bookmarks.filter(b => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-5 text-center"><div className="spinner-border text-teal"></div></div>;

  const articles = bookmarks.filter(b => b.itemType === 'article');
  const tools = bookmarks.filter(b => b.itemType === 'tool');

  return (
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="fw-bold mb-1" style={{ fontFamily: "var(--serif)", color: "var(--ink)" }}>Saved Library</h2>
          <p className="text-muted">Your personal collection of bookmarked guides and tools.</p>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-bookmark-star text-muted" style={{ fontSize: "4rem", opacity: 0.5 }}></i>
          <h4 className="mt-3 text-muted">Your library is empty.</h4>
          <p className="text-muted">Start saving articles and tools to read later.</p>
          <Link to="/" className="btn text-white mt-2" style={{ background: "var(--teal)" }}>Browse Articles</Link>
        </div>
      ) : (
        <div className="row g-5">
          {/* Articles Section */}
          <div className="col-lg-6">
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <i className="bi bi-file-text text-teal"></i> Saved Articles ({articles.length})
            </h4>
            {articles.length === 0 ? <p className="text-muted small">No saved articles.</p> : (
              <div className="d-flex flex-column gap-3">
                {articles.map(b => (
                  <div key={b._id} className="card border-0" style={{ background: "var(--card-bg)", boxShadow: "var(--shadow)", borderRadius: "var(--radius)" }}>
                    <div className="card-body p-3 d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="fw-bold mb-1">
                          {b.slug.startsWith('http') ? (
                            <a href={b.slug} target="_blank" rel="noopener noreferrer" className="text-dark text-decoration-none hover-underline">{b.title}</a>
                          ) : (
                            <Link to={b.slug} className="text-dark text-decoration-none hover-underline">{b.title}</Link>
                          )}
                        </h6>
                        <small className="text-muted">Saved on {new Date(b.createdAt).toLocaleDateString()}</small>
                      </div>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeBookmark(b._id)}>
                        <i className="bi bi-heartbreak"></i> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tools Section */}
          <div className="col-lg-6">
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <i className="bi bi-calculator text-teal"></i> Saved Tools ({tools.length})
            </h4>
            {tools.length === 0 ? <p className="text-muted small">No saved tools.</p> : (
              <div className="d-flex flex-column gap-3">
                {tools.map(b => (
                  <div key={b._id} className="card border-0" style={{ background: "var(--card-bg)", boxShadow: "var(--shadow)", borderRadius: "var(--radius)" }}>
                    <div className="card-body p-3 d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="fw-bold mb-1">
                          {b.slug.startsWith('http') ? (
                            <a href={b.slug} target="_blank" rel="noopener noreferrer" className="text-dark text-decoration-none hover-underline">{b.title}</a>
                          ) : (
                            <Link to={b.slug} className="text-dark text-decoration-none hover-underline">{b.title}</Link>
                          )}
                        </h6>
                        <small className="text-muted">Saved on {new Date(b.createdAt).toLocaleDateString()}</small>
                      </div>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeBookmark(b._id)}>
                        <i className="bi bi-heartbreak"></i> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
