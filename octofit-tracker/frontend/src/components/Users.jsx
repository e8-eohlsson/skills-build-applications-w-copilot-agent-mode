import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('users').then(setUsers).catch((requestError) => setError(requestError.message));
  }, []);

  if (error) return <p className="empty-state">{error}</p>;

  return (
    <section className="content-section">
      <div className="section-heading"><span className="eyebrow">Community</span><h1>People in motion</h1><p>Meet the athletes building momentum together.</p></div>
      <div className="profile-grid">
        {users.map((user) => (
          <article className="profile-card" key={user._id || user.id || user.username}>
            <div className="avatar">{(user.profile?.displayName || user.username || '?').charAt(0)}</div>
            <div><h2>{user.profile?.displayName || user.username}</h2><p className="muted">@{user.username}</p><p>{user.profile?.fitnessGoal || 'Ready for the next session'}</p></div>
          </article>
        ))}
      </div>
      {!users.length && <p className="empty-state">No members found yet.</p>}
    </section>
  );
}

export default Users;