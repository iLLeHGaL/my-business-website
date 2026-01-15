import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'

// Icons as simple SVG components
const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"/>
  </svg>
)

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd"/>
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon-sm">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/>
  </svg>
)

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd"/>
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd"/>
  </svg>
)

// Service icons
const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="service-icon">
    <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.75 6.75 0 01-.937-.171.75.75 0 11.374-1.453 5.25 5.25 0 002.626 0 .75.75 0 11.374 1.452 6.75 6.75 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z"/>
    <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 01.877-.597 11.25 11.25 0 004.22 0 .75.75 0 01.28 1.473 12.75 12.75 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z" clipRule="evenodd"/>
  </svg>
)

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="service-icon">
    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"/>
    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"/>
  </svg>
)

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="service-icon">
    <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5h-.75V3.75a.75.75 0 000-1.5h-15zM9 6a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm-.75 3.75A.75.75 0 019 9h1.5a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 12a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H9zm3.75-5.25A.75.75 0 0113.5 6H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM13.5 9a.75.75 0 000 1.5H15A.75.75 0 0015 9h-1.5zm-.75 3.75a.75.75 0 01.75-.75H15a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM9 19.5v-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-4.5A.75.75 0 019 19.5z" clipRule="evenodd"/>
  </svg>
)

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="service-icon">
    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd"/>
  </svg>
)

const WrenchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="service-icon">
    <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd"/>
  </svg>
)

const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="service-icon">
    <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z"/>
    <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 115.958.464c.853-.175 1.5-.935 1.5-1.838V13.5a.75.75 0 00-.75-.75h-1.5a.75.75 0 01-.75-.75V7.5a.75.75 0 00-.75-.75h-3zM19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"/>
  </svg>
)

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '')
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname, hash])

  return null
}

// Navigation Component
function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
          <img src="/Bourbonnaisv2.png" alt="Bourbonnais Electric" className="logo-img" />
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/#services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <a href="tel:+18159339355" className="nav-phone">
            <PhoneIcon />
            (815) 933-9355
          </a>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </nav>
  )
}

// Hero Section
function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1>Your Trusted Electrical Contractor</h1>
        <p>Serving Ottawa and the Eastern Ontario region for over 20 years. Licensed, insured, and committed to quality workmanship.</p>
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">Get a Free Quote</a>
          <a href="tel:+18159339355" className="btn btn-secondary">
            <PhoneIcon />
            Call Now
          </a>
        </div>
        <div className="hero-features">
          <div className="hero-feature">
            <CheckIcon />
            <span>Licensed & Insured</span>
          </div>
          <div className="hero-feature">
            <CheckIcon />
            <span>24/7 Emergency Service</span>
          </div>
          <div className="hero-feature">
            <CheckIcon />
            <span>Free Estimates</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Services Section
function Services() {
  const services = [
    {
      icon: <HomeIcon />,
      title: 'Residential Electrical',
      description: 'Complete home electrical services including wiring, panel upgrades, lighting installation, and electrical repairs.'
    },
    {
      icon: <BuildingIcon />,
      title: 'Commercial Electrical',
      description: 'Professional electrical solutions for businesses, offices, and commercial properties of all sizes.'
    },
    {
      icon: <LightbulbIcon />,
      title: 'Lighting Services',
      description: 'Indoor and outdoor lighting installation, LED upgrades, landscape lighting, and smart lighting systems.'
    },
    {
      icon: <ShieldIcon />,
      title: 'Electrical Safety',
      description: 'Safety inspections, surge protection, smoke detector installation, and electrical safety examinations.'
    },
    {
      icon: <WrenchIcon />,
      title: 'Repairs & Maintenance',
      description: 'Troubleshooting, circuit breaker repairs, flickering lights, power surge issues, and preventive maintenance.'
    },
    {
      icon: <CarIcon />,
      title: 'EV Charger Installation',
      description: 'Electric vehicle charger installation for homes and businesses. Level 2 charger specialists.'
    }
  ]

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive electrical solutions for all your residential and commercial needs</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Process Section
function Process() {
  const steps = [
    {
      title: 'Call or Request a Quote',
      description: 'Tell us about your project and your timeline. We will ask a few quick questions to understand your needs.'
    },
    {
      title: 'On-Site Visit',
      description: 'We inspect the space, review options, and provide a clear estimate with the scope and pricing.'
    },
    {
      title: 'Professional Installation',
      description: 'Our licensed electricians complete the work safely, cleanly, and on schedule.'
    },
    {
      title: 'Final Walkthrough',
      description: 'We test everything, review the results with you, and share maintenance tips if needed.'
    }
  ]

  return (
    <section id="process" className="process">
      <div className="container">
        <div className="section-header">
          <h2>Our Process</h2>
          <p>From the first call to the final walkthrough, we keep things clear, efficient, and stress-free.</p>
        </div>
        <div className="process-grid">
          {steps.map((step, index) => (
            <div key={step.title} className="process-card">
              <div className="process-step">Step {index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Gallery Section
function Gallery() {
  const projects = [
    {
      title: 'Service Panel Upgrade',
      location: 'Rockland, ON',
      detail: '200A panel, whole-home surge protection'
    },
    {
      title: 'Commercial Lighting Retrofit',
      location: 'Ottawa, ON',
      detail: 'Energy-saving LED upgrade for office suite'
    },
    {
      title: 'EV Charger Installation',
      location: 'Clarence-Rockland, ON',
      detail: 'Level 2 charger with dedicated circuit'
    },
    {
      title: 'Basement Renovation',
      location: 'Orleans, ON',
      detail: 'Complete rough-in, lighting, and outlets'
    },
    {
      title: 'Exterior Lighting',
      location: 'Cumberland, ON',
      detail: 'Landscape and security lighting package'
    },
    {
      title: 'Commercial Service Call',
      location: 'Ottawa, ON',
      detail: 'Troubleshooting and circuit repair'
    }
  ]

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <h2>Gallery</h2>
          <p>A snapshot of recent projects completed across the Ottawa region.</p>
        </div>
        <div className="gallery-grid">
          {projects.map((project, index) => (
            <article key={`${project.title}-${index}`} className="gallery-card">
              <div className={`gallery-thumb variant-${(index % 3) + 1}`}></div>
              <div className="gallery-body">
                <h3>{project.title}</h3>
                <p className="gallery-location">{project.location}</p>
                <p>{project.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section
function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <h2>About Bourbonnais Electric Service Inc.</h2>
            <p className="lead">
              For over 20 years, we've been the trusted electrical contractor for homeowners and businesses throughout Rockland, Ontario and the Ottawa region.
            </p>
            <p>
              As a locally owned and operated company, we take pride in delivering exceptional service and building lasting relationships with our customers. Our team of licensed electricians brings expertise, professionalism, and attention to detail to every project.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <CheckIcon />
                <span>Over 20 years of experience</span>
              </div>
              <div className="about-feature">
                <CheckIcon />
                <span>Locally owned and operated</span>
              </div>
              <div className="about-feature">
                <CheckIcon />
                <span>Fully licensed and insured</span>
              </div>
              <div className="about-feature">
                <CheckIcon />
                <span>Competitive pricing</span>
              </div>
              <div className="about-feature">
                <CheckIcon />
                <span>100% satisfaction guarantee</span>
              </div>
              <div className="about-feature">
                <CheckIcon />
                <span>Clean and professional service</span>
              </div>
            </div>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">20+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Emergency Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Team Section
function Team() {
  const teamMembers = [
    {
      name: 'Marc Bourbonnais',
      role: 'Founder',
      description: 'Founded Bourbonnais Electric in 2005 with a vision to provide exceptional electrical services to the Ottawa region.',
      image: '/Marc.png',
      imageClass: 'team-photo--med'
    },
    {
      name: 'Guillaume Bourbonnais',
      role: 'Co-Owner / Operations',
      description: 'Continuing the family tradition of excellence, Guillaume oversees daily operations and ensures quality on every project.',
      image: '/Guillaume.png',
      imageClass: 'team-photo--tight'
    },
    {
      name: 'Nick Bourbonnais',
      role: 'Co-Owner / Project Management',
      description: 'Nick leads project management and client relations, ensuring every job is completed on time and to the highest standards.',
      image: '/Nick.PNG',
      imageClass: 'team-photo--tight'
    }
  ]

  return (
    <section id="team" className="team">
      <div className="container">
        <div className="section-header">
          <h2>Our Team</h2>
          <p>Meet the dedicated professionals behind Bourbonnais Electric</p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`team-photo${member.imageClass ? ` ${member.imageClass}` : ''}`}
                  />
                ) : (
                  member.name.split(' ').map(n => n[0]).join('')
                )}
              </div>
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Get in touch for a free estimate or to schedule your electrical service</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <PhoneIcon />
              <div>
                <h3>Phone</h3>
                <a href="tel:+18159339355">(815) 933-9355</a>
              </div>
            </div>
            <div className="contact-card">
              <MapPinIcon />
              <div>
                <h3>Service Area</h3>
                <p>Ottawa & Eastern Ontario Region</p>
              </div>
            </div>
            <div className="contact-card">
              <ClockIcon />
              <div>
                <h3>Hours</h3>
                <p>Mon-Fri: 7AM - 6PM</p>
                <p>24/7 Emergency Service</p>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="service">Service Needed</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Select a service</option>
                <option value="residential">Residential Electrical</option>
                <option value="commercial">Commercial Electrical</option>
                <option value="lighting">Lighting Installation</option>
                <option value="repairs">Repairs & Maintenance</option>
                <option value="ev-charger">EV Charger Installation</option>
                <option value="inspection">Safety Inspection</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-full">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  )
}

function PageHeader({ title, subtitle }) {
  return (
    <section className="page-header">
      <div className="container">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Contact />
    </>
  )
}

function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Bourbonnais Electric"
        subtitle="Meet the team and learn why homeowners and businesses trust us for electrical work."
      />
      <About />
      <Team />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Request a quote or schedule service with our licensed electricians."
      />
      <Contact />
    </>
  )
}

function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Project Gallery"
        subtitle="Recent upgrades, installs, and service calls completed across the Ottawa region."
      />
      <Gallery />
    </>
  )
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <img src="/Bourbonnaisv2.png" alt="Bourbonnais Electric" className="logo-img" />
            </Link>
            <p>Your trusted electrical contractor serving Rockland, Ontario and the Ottawa region for over 20 years.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/#services">Services</Link>
            <Link to="/#process">Process</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-services">
            <h4>Services</h4>
            <Link to="/#services">Residential Electrical</Link>
            <Link to="/#services">Commercial Electrical</Link>
            <Link to="/#services">EV Charger Installation</Link>
            <Link to="/#services">Lighting Services</Link>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p><PhoneIcon /> (815) 933-9355</p>
            <p><MapPinIcon /> Rockland, Ontario</p>
            <p><ClockIcon /> Mon-Fri: 7AM-6PM</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Bourbonnais Electric Service Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="app">
        <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
