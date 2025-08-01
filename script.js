// Enhanced animations and interactions for the resume website

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav links
  const navLinks = document.querySelectorAll('nav#navbar a');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('main section, header#header');
  const options = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const navLink = document.querySelector(`nav#navbar a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });

  // Animate content sections on scroll
  const contentSections = document.querySelectorAll('.content-section');
  const animationObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  contentSections.forEach(section => {
    animationObserver.observe(section);
  });

  // Animate skill bars
  const skillBarsData = [
    { label: 'Communication', percent: 95 },
    { label: 'Public Speaking', percent: 90 },
    { label: 'Content Writing', percent: 80 },
    { label: 'Team Leadership', percent: 95 },
    { label: 'Customer Service', percent: 90 },
    { label: 'MS Office & Email', percent: 90 },
    { label: 'Social Media', percent: 80 },
    { label: 'Typing & Docs', percent: 90 },
    { label: 'HTML', percent: 98 },
    { label: 'Time Management', percent: 92 },
    { label: 'Adaptability', percent: 88 },
    { label: 'Creative Writing And Shayari', percent: 95 }
  ];

  const educationScoresData = [
    { id: 'hsc', percent: 56 },
    { id: 'ssc', percent: 83 }
  ];

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillBarsContainer = document.getElementById('skill-bars-container');
    if (!skillBarsContainer) {
      console.error('Skill bars container not found');
      return;
    }
    skillBarsData.forEach(skill => {
      const barContainer = document.createElement('div');
      barContainer.classList.add('skill-bar');

      const barFill = document.createElement('div');
      barFill.classList.add('skill-bar-fill');
      barFill.style.width = '0%';

      const label = document.createElement('span');
      label.classList.add('skill-label');
      label.textContent = skill.label;

      barContainer.appendChild(barFill);
      barContainer.appendChild(label);
      skillBarsContainer.appendChild(barContainer);

      // Animate fill on scroll
      const fillObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            barFill.style.width = skill.percent + '%';
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      fillObserver.observe(barContainer);
    });
  }

  // Animate education score bars
  educationScoresData.forEach(scoreData => {
    const scoreFill = document.querySelector(`.score-fill[data-score][data-id="${scoreData.id}"]`) || document.querySelector(`.score-fill[data-score]`);
    if (scoreFill) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            scoreFill.style.width = scoreData.percent + '%';
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      observer.observe(scoreFill);
    }
  });

  // Background floating particles effect
  const background = document.getElementById('background');
  const particleCount = 40;
  const particles = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Particle {
    constructor() {
      this.x = random(0, window.innerWidth);
      this.y = random(0, window.innerHeight);
      this.size = random(2, 6);
      this.speedX = random(-0.2, 0.2);
      this.speedY = random(-0.2, 0.2);
      this.opacity = random(0.1, 0.4);
      this.color = 'rgba(187, 134, 252,' + this.opacity + ')';
      this.element = document.createElement('div');
      this.element.style.position = 'fixed';
      this.element.style.borderRadius = '50%';
      this.element.style.backgroundColor = this.color;
      this.element.style.width = this.size + 'px';
      this.element.style.height = this.size + 'px';
      this.element.style.left = this.x + 'px';
      this.element.style.top = this.y + 'px';
      this.element.style.pointerEvents = 'none';
      this.element.style.zIndex = '-1';
      background.appendChild(this.element);
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if(this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
      if(this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;

      this.element.style.left = this.x + 'px';
      this.element.style.top = this.y + 'px';
    }
  }

  for(let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    particles.forEach(p => p.update());
    requestAnimationFrame(animate);
  }

  animate();
});

// Function to open report cards (placeholder implementation)
function openReport(type) {
  if (type === 'hsc') {
    window.open('images/12th.jpg', '_blank');
  } else if (type === 'ssc') {
    window.open('images/10th.jpg', '_blank');
  }
}
