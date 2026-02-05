import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const galleryImages = [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/02/61/b1/caption.jpg?w=500&h=500&s=1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzUHeHCQsLfqkzRyyg80Kps92l3_LnhlN6Ag&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmX2MBbki9GzALqgk_m3dyFyJtI0t-chNT1Q&s"
  ];

  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero */}
      <section className="hero-premium">
        <div className="hero-premium-content">
          <h1>
            One Platform for Exceptional Camping Experiences
          </h1>

          <p>
            We connect outdoor enthusiasts with carefully selected camping
            centers and activities, providing a reliable and seamless booking
            experience.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="trust-item">
          <h3>Carefully Selected Centers</h3>
          <p>
            Each center is reviewed to ensure quality, safety, and authenticity.
          </p>
        </div>

        <div className="trust-item">
          <h3>Transparent Experience</h3>
          <p>
            Clear information, real images, and honest descriptions.
          </p>
        </div>

        <div className="trust-item">
          <h3>Simple Booking Process</h3>
          <p>
            Designed to save time and eliminate complexity.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-premium">
        <h2>Selected Destinations</h2>

        <div className="gallery-row">
          {galleryImages.map((img, index) => (
            <div className="gallery-image" key={index}>
              <img src={img} alt={`Destination ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-premium">
        <h2>Plan Your Next Outdoor Experience</h2>
        <p>
          Join today and explore trusted camping destinations with confidence.
        </p>

        <button
          className="primary-btn"
          onClick={() => navigate("/register")}
        >
          Create Your Account
        </button>
      </section>
    </div>
  );
}

export default LandingPage;