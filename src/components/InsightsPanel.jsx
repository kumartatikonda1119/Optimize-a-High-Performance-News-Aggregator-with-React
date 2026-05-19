function InsightsPanel({ stats }) {
  return (
    <section className="insights">
      <div>
        <p className="insights-label">Stories loaded</p>
        <h3>{stats.total}</h3>
      </div>
      <div>
        <p className="insights-label">Highest score</p>
        <h3>{stats.topScore}</h3>
      </div>
      <div>
        <p className="insights-label">Filtered</p>
        <h3>{stats.filtered}</h3>
      </div>
    </section>
  );
}

export default InsightsPanel;
