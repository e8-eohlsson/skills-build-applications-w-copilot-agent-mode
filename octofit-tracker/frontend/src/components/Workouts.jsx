import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchCollection } from '../api';

const workoutsEndpoint = `${apiBaseUrl}/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(workoutsEndpoint, 'workouts').then(setWorkouts).catch((requestError) => setError(requestError.message));
  }, []);

  if (error) return <p className="empty-state">{error}</p>;

  return (
    <section className="content-section">
      <div className="section-heading"><span className="eyebrow">Your library</span><h1>Suggested workouts</h1><p>Choose a session that meets you where you are.</p></div>
      <div className="workout-grid">
        {workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id || workout.name}><div className="workout-top"><span className="difficulty">{workout.difficulty || 'Any level'}</span><span>{workout.durationMinutes || workout.duration || '--'} min</span></div><h2>{workout.name}</h2><p>{workout.description || 'A focused session for a stronger week.'}</p><div className="tag-row">{(workout.focusAreas || []).map((area) => <span key={area}>{area}</span>)}</div></article>)}
      </div>
      {!workouts.length && <p className="empty-state">No workouts found yet.</p>}
    </section>
  );
}

export default Workouts;