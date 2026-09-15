import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchCollection } from '../api';

const teamsEndpoint = `${apiBaseUrl}/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection(teamsEndpoint, 'teams').then(setTeams).catch((requestError) => setError(requestError.message));
  }, []);

  if (error) return <p className="empty-state">{error}</p>;

  return (
    <section className="content-section">
      <div className="section-heading"><span className="eyebrow">Together</span><h1>Find your team</h1><p>Friendly accountability makes the miles lighter.</p></div>
      <div className="team-grid">
        {teams.map((team) => <article className="team-card" key={team._id || team.id || team.name}><span className="team-mark">+</span><h2>{team.name}</h2><p>{team.description || 'A crew committed to showing up.'}</p><span className="member-count">{team.memberIds?.length || team.members?.length || 0} members</span></article>)}
      </div>
      {!teams.length && <p className="empty-state">No teams found yet.</p>}
    </section>
  );
}

export default Teams;