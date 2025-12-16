import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Card, Button, Accordion } from "react-bootstrap";

function Home() {
  const navigate = useNavigate();

  // Handle scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page">

      {/* ================= Hero Section ================= */}
      <section className="hero-section text-center py-5 animate-fade-up">
        <h1 className="hero-title">FlexiPDF - Next Level PDF Tools</h1>
        <p className="lead mt-3 hero-subtitle">
          Convert, edit, and manage PDFs like a pro. Fast, secure, and effortless.
        </p>
        <div className="mt-4 hero-buttons">
          <Button className="btn-primary mx-2" onClick={() => scrollToSection("features")}>
            Get Started
          </Button>
          <Button className="btn-outline-light mx-2" onClick={() => scrollToSection("faq")}>
            Learn More
          </Button>
        </div>
      </section>

      {/* ================= Feature Section ================= */}
      <section id="features" className="feature-section py-5">
       <div className="row g-4">
  <div className="col-md-3">
    <Card className="feature-card p-4 text-center glass-card animate-fade-up">
      <i className="bi bi-file-earmark-arrow-up display-4 mb-3"></i>
      <Card.Body>
        <Card.Title>PDF to Word</Card.Title>
        <Card.Text>
          Convert PDF files into editable Word documents quickly and accurately.
        </Card.Text>
        <Button variant="light" onClick={() => navigate("/pdf-to-word")}>
          Try Now
        </Button>
      </Card.Body>
    </Card>
  </div>

  <div className="col-md-3">
    <Card className="feature-card p-4 text-center glass-card animate-fade-up">
      <i className="bi bi-file-earmark-arrow-down display-4 mb-3"></i>
      <Card.Body>
        <Card.Title>Word to PDF</Card.Title>
        <Card.Text>
          Convert Word documents to PDF format with a single click.
        </Card.Text>
        <Button variant="light" onClick={() => navigate("/word-to-pdf")}>
          Try Now
        </Button>
      </Card.Body>
    </Card>
  </div>

  <div className="col-md-3">
    <Card className="feature-card p-4 text-center glass-card animate-fade-up">
      <i className="bi bi-image display-4 mb-3"></i>
      <Card.Body>
        <Card.Title>PDF to Image</Card.Title>
        <Card.Text>
          Export pages from PDF as high-quality images effortlessly.
        </Card.Text>
        <Button variant="light" onClick={() => navigate("/pdf-to-image")}>
          Try Now
        </Button>
      </Card.Body>
    </Card>
  </div>

  <div className="col-md-3">
    <Card className="feature-card p-4 text-center glass-card animate-fade-up">
      <i className="bi bi-file-earmark-image display-4 mb-3"></i>
      <Card.Body>
        <Card.Title>Images → PDF</Card.Title>
        <Card.Text>
          Merge multiple images into a single PDF quickly and easily.
        </Card.Text>
        <Button variant="light" onClick={() => navigate("/images-to-pdf")}>
          Try Now
        </Button>
      </Card.Body>
    </Card>
  </div>
</div>


      </section>



      {/* ================= Tool Cards Section ================= */}
      <section className="tool-section py-5 bg-dark">
        <div className="container">
          <h2 className="text-center mb-5 animate-fade-in">Other Tools</h2>
          <div className="row g-4">
            {[
              { name: "Merge PDFs", route: "/merge-pdf" },
              { name: "Split PDFs", route: "/split-pdf" },
              { name: "Compress PDFs", route: "/compress-pdf" },
              { name: "Rotate PDFs", route: "/rotate-pdf" },
            ].map((tool, idx) => (
              <div className="col-md-3" key={idx}>
                <Card className="tool-card p-4 text-center glass-card animate-fade-up">
                  <i className="bi bi-tools display-4 mb-3"></i>
                  <Card.Body>
                    <Card.Title>{tool.name}</Card.Title>
                    <Card.Text>
                      Easy and fast {tool.name.toLowerCase()} in one click.
                    </Card.Text>
                    <Button variant="light" onClick={() => navigate(tool.route)}>
                      Try Now
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Testimonials ================= */}
      <section className="testimonial-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 animate-fade-in">What Users Say</h2>
          <div className="row g-4">
            {[{ name: "Alice", text: "Amazing PDF tools! Saved me hours." },
              { name: "Bob", text: "Very intuitive and fast." },
              { name: "Charlie", text: "Love the interface and features." }].map((t, idx) => (
              <div className="col-md-4" key={idx}>
                <Card className="testimonial-card p-4 glass-card animate-fade-up">
                  <Card.Body className="text-center">
                    <img
                      src={`https://i.pravatar.cc/150?img=${idx + 10}`}
                      alt={t.name}
                      className="rounded-circle mb-3"
                      width={80}
                    />
                    <Card.Title>{t.name}</Card.Title>
                    <Card.Text>"{t.text}"</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ / Accordion ================= */}
      <section id="faq" className="faq-section py-5 bg-dark">
        <div className="container">
          <h2 className="text-center mb-4 animate-fade-in">FAQs</h2>
          <Accordion defaultActiveKey="0">
            {[{ q: "Is it free?", a: "Yes, basic tools are free forever." },
              { q: "Do I need to sign up?", a: "Sign up for saving your work and cloud features." },
              { q: "Is it secure?", a: "All files are encrypted and deleted after processing." }].map((f, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header>{f.q}</Accordion.Header>
                <Accordion.Body>{f.a}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ================= Newsletter Section ================= */}
      <section className="newsletter-section py-5 text-center">
        <div className="container">
          <h2 className="animate-fade-in mb-3">Subscribe for Updates</h2>
          <p className="mb-4 animate-fade-in">
            Get the latest news and updates about FlexiPDF
          </p>
          <div className="d-flex justify-content-center animate-fade-up">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control w-50 me-2 glass-input"
            />
            <Button
              className="btn-primary"
              onClick={() => alert("✅ Subscribed successfully!")}
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* ================= Footer Promo ================= */}
      <section className="bg-dark text-center py-5">
        <h3 className="animate-fade-in">Ready to start?</h3>
        <p className="animate-fade-in">
          Join thousands of happy users and simplify your PDF workflow
        </p>
        <Button className="btn-primary animate-fade-up" onClick={() => navigate("/pdf-to-word")}>
          Get Started Now
        </Button>
      </section>
    </div>
  );
}

export default Home;
