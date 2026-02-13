import "../Layout/LandingPage.css";

function LandingPage() {
  return (
    <div className="landing">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Discover Luxury in the Wild</h1>
          <p>
            Experience curated outdoor journeys designed for comfort,
            adventure, and elegance.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Explore Experiences</button>
            <button className="secondary-btn">Book Your Escape</button>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <h2>Featured Experiences</h2>
        <div className="featured-grid">
          <div className="card large">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" alt="" />
            <div className="card-content">
              <h3>Luxury Desert Camp</h3>
              <p>From $120</p>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" alt="" />
            <div className="card-content">
              <h3>Mountain Escape</h3>
              <p>From $95</p>
            </div>
          </div>

          <div className="card">
            <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e" alt="" />
            <div className="card-content">
              <h3>Forest Retreat</h3>
              <p>From $110</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY MASARAT */}
      <section className="why">
        <h2>Why Masarat</h2>
        <div className="why-grid">
          <div className="why-card">
            <h3>Premium Activities</h3>
            <p>Carefully curated luxury outdoor experiences.</p>
          </div>
          <div className="why-card">
            <h3>Verified Organizers</h3>
            <p>Trusted providers with high standards.</p>
          </div>
          <div className="why-card">
            <h3>Exclusive Locations</h3>
            <p>Handpicked destinations across the region.</p>
          </div>
          <div className="why-card">
            <h3>Safety & Comfort</h3>
            <p>Top-tier service with maximum comfort.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Your Next Adventure Awaits</h2>
        <button className="primary-btn">Start Exploring</button>
      </section>

    </div>
  );
}

export default LandingPage;
