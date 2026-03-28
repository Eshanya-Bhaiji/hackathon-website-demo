const textElement = document.querySelector('.hero p');
const text = textElement.innerText;
textElement.innerText = '';

let i = 0;
function typeWriter() {
    if (i < text.length) {
        textElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

// Start typing effect on load
window.onload = typeWriter;

// Navbar shadow on scroll
window.onscroll = function() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 20) {
        nav.style.boxShadow = "0 5px 20px rgba(0, 255, 65, 0.1)";
    } else {
        nav.style.boxShadow = "none";
    }
};

document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    hero.style.backgroundPosition = `${x}px ${y}px`;
});



// Make circles glow when in viewport
const circles = document.querySelectorAll('.circle');

function checkInView() {
  const windowBottom = window.innerHeight;
  circles.forEach(circle => {
    const rect = circle.getBoundingClientRect();
    if(rect.top < windowBottom - 50) {
      circle.classList.add('active');
    } else {
      circle.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', checkInView);
window.addEventListener('load', checkInView);


const cards = document.querySelectorAll('.theme-card');
const title = document.getElementById('theme-title');
const description = document.getElementById('theme-description');

const themeData = {
    theme1: {
        title: "Ethical Hacking & Penetration Testing",
        description: "Explore system vulnerabilities, perform penetration testing, and suggest fixes. Start by selecting a target system and using tools like Nmap, Metasploit, or Wireshark. Document your findings responsibly."
    },
    theme2: {
        title: "AI & Cyber Threat Detection",
        description: "Use machine learning models to detect phishing, malware, or suspicious activity. Start by collecting datasets, training models, and building a real-time threat detection system."
    },
    theme3: {
        title: "Secure Digital Identity & Privacy",
        description: "Focus on protecting personal data, authentication, and privacy. You can build secure login systems, implement encryption, or design privacy-preserving apps."
    },
    theme4: {
        title: "IoT & Smart Device Security",
        description: "Secure IoT devices like smart homes or wearables. Start by identifying vulnerabilities, implementing secure communication, and testing devices for potential attacks."
    },
    theme5: {
        title: "Blockchain & Cybersecurity",
        description: "Use blockchain to ensure data integrity, secure transactions, and identity verification. Start by designing decentralized applications or exploring smart contract security."
    },
    theme6: {
        title: "Cybersecurity Awareness & Gamification",
        description: "Educate users about online threats through interactive apps or games. Start by creating quizzes, simulations, or interactive learning modules."
    }
};

cards.forEach(card => {
    card.addEventListener('click', () => {
        const theme = card.getAttribute('data-theme');
        title.textContent = themeData[theme].title;
        description.textContent = themeData[theme].description;
    });
});

function verifyManual() {
    const id = document.getElementById('manual-id').value;
    if(id) {
        alert("Verifying certificate ID: " + id);
        // Add real verification logic here
    } else {
        alert("Please enter a certificate ID");
    }
}

function uploadCertificate(event) {
    const file = event.target.files[0];
    if(file) {
        alert("Uploading " + file.name + " for OCR verification");
        // Add real OCR logic here
    }
}

const canvas = document.getElementById('cyber-bg');
const ctx = canvas.getContext('2d');

console.log("Canvas width:", canvas.width); // Check if this shows in browser console (F12)

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const katakana = "0110101001101010010101010101010101ABCDEF";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: Math.floor(columns) }).fill(1);

function draw() {
    ctx.fillStyle = "rgba(2, 4, 8, 0.1)"; // Background trail
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        ctx.fillStyle = "#00ff41"; // Cyber Green
        const text = katakana.charAt(Math.floor(Math.random() * katakana.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 35);
const canvas = document.getElementById('cyber-emoji-bg');
const ctx = canvas.getContext('2d');

// Configure the animation
const EMOJI_SIZE = 32; // base size
const emojiSet = ["💻", "🔐", "🛡️", "🌐", "🤖", "⚡", "🛰️", "🎯"];
const numEmojis = 60; // Total count

// Set Canvas to Full Screen and handle resizing
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- THE EMOJI CLASS ---
class FloatingEmoji {
  constructor() {
    this.init();
  }

  // Define properties for each emoji
  init() {
    // Random position
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    
    // Choose character
    this.emoji = emojiSet[Math.floor(Math.random() * emojiSet.length)];
    
    // Create layers/parallax effect
    this.depth = Math.random(); // 0 (far) to 1 (near)
    
    // Size increases with depth
    this.size = EMOJI_SIZE * (0.5 + this.depth * 1.5);
    
    // Speed increases with depth (nearer emojis move faster)
    this.speedX = (Math.random() - 0.5) * (0.2 + this.depth * 0.8);
    this.speedY = (Math.random() - 0.5) * (0.2 + this.depth * 0.8);
    
    // Opacity decreases with depth (farther emojis are dimmer)
    this.opacity = 0.1 + this.depth * 0.4;
  }

  // Move the emoji
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around the screen borders
    if (this.x < -this.size) this.x = canvas.width;
    if (this.x > canvas.width + this.size) this.x = 0;
    if (this.y < -this.size) this.y = canvas.height;
    if (this.y > canvas.height + this.size) this.y = 0;
  }

  // Draw the emoji
  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.font = `${this.size}px monospace`;
    ctx.fillStyle = "#fff"; // base color (emoji renders its own colors)
    
    // Add a slight glow effect
    ctx.shadowColor = Math.random() > 0.5 ? "#00ff41" : "#4cc9f0";
    ctx.shadowBlur = 10 * this.depth;
    
    ctx.fillText(this.emoji, this.x, this.y);
    
    // Reset glow for the next item
    ctx.shadowBlur = 0;
  }
}

// --- ANIMATION LOOP ---
const emojis = Array.from({ length: numEmojis }, () => new FloatingEmoji());

function animate() {
  // Clear the canvas to draw the next frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Sort by depth so closer ones are drawn on top
  emojis.sort((a, b) => a.depth - b.depth);

  emojis.forEach(emoji => {
    emoji.update();
    emoji.draw();
  });

  // Keep drawing
  requestAnimationFrame(animate);
}

// Start the animation
requestAnimationFrame(animate);