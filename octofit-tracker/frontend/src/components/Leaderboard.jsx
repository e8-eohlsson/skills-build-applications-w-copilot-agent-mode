import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchCollection } from '../api';

const leaderboardEndpoint = `${apiBaseUrl}/api/leaderboard/`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(leaderboardEndpoint, 'leaderboard').then(setEntries).catch((requestError) => setError(requestError.message));
  }, []);

  if (error) return <p className="empty-state">{error}</p>;

  return (
    <section className="content-section">
      <div className="section-heading"><span className="eyebrow">Weekly pulse</span><h1>Leaderboard</h1><p>Celebrate consistency, not just the finish line.</p></div>
      <div className="leaderboard-list">
        {entries.map((entry, index) => <article className={`leaderboard-row ${index === 0 ? 'leader' : ''}`} key={entry._id || entry.id || entry.userId?._id}><span className="rank">{entry.rank || index + 1}</span><div><h2>{entry.userId?.profile?.displayName || entry.userId?.username || entry.username || 'Athlete'}</h2><p>{entry.period || 'Current period'}</p></div><strong>{entry.points || 0}<small> pts</small></strong></article>)}
      </div>
      {!entries.length && <p className="empty-state">No leaderboard entries yet.</p>}
    </section>
  );
}

export default Leaderboard;