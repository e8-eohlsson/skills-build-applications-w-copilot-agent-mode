import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((requestError) => setError(requestError.message));
  }, []);

  if (error) return <p className="empty-state">{error}</p>;

  return (
    <section className="content-section">
      <div className="section-heading"><span className="eyebrow">The feed</span><h1>Recent activities</h1><p>Small sessions become visible progress.</p></div>
      <div className="activity-list">
        {activities.map((activity) => (
          <article className="activity-row" key={activity._id || activity.id}>
            <div className="activity-icon">{(activity.type || 'A').charAt(0)}</div>
            <div className="activity-copy"><h2>{activity.type || 'Workout'}</h2><p>{activity.userId?.profile?.displayName || activity.userId?.username || 'OctoFit member'} · {activity.teamId?.name || 'Independent'}</p></div>
            <div className="activity-score"><strong>{activity.points || 0}</strong><span>points</span></div>
          </article>
        ))}
      </div>
      {!activities.length && <p className="empty-state">No activities found yet.</p>}
    </section>
  );
}

export default Activities;