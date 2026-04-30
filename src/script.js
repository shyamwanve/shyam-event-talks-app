
document.addEventListener('DOMContentLoaded', () => {
  const talksData = [
  {
    "id": "talk1",
    "title": "The Future of AI in Healthcare",
    "speakers": ["Dr. Anya Sharma"],
    "category": ["AI", "Healthcare", "Innovation"],
    "description": "Exploring how artificial intelligence is revolutionizing diagnostics, treatment plans, and patient care."
  },
  {
    "id": "talk2",
    "title": "Sustainable Software Development",
    "speakers": ["Mark Jensen", "Sarah Lee"],
    "category": ["Sustainability", "Software Engineering", "Best Practices"],
    "description": "Strategies for building eco-friendly applications and reducing carbon footprints in software."
  },
  {
    "id": "talk3",
    "title": "Mastering Cloud-Native Architectures",
    "speakers": ["Emily Chen"],
    "category": ["Cloud", "DevOps", "Architecture"],
    "description": "A deep dive into designing and deploying resilient, scalable applications using cloud-native principles."
  },
  {
    "id": "talk4",
    "title": "Quantum Computing for Beginners",
    "speakers": ["Dr. Ben Carter"],
    "category": ["Quantum", "Emerging Tech", "Fundamentals"],
    "description": "An accessible introduction to the basics of quantum computing and its potential impact."
  },
  {
    "id": "talk5",
    "title": "Cybersecurity in the Age of AI",
    "speakers": ["Alex Rodriguez"],
    "category": ["Cybersecurity", "AI", "Threats"],
    "description": "Understanding new cybersecurity challenges and defenses arising from advanced AI systems."
  },
  {
    "id": "talk6",
    "title": "Building Interactive UIs with Web Components",
    "speakers": ["Jessica Wong"],
    "category": ["Frontend", "Web Development", "UI/UX"],
    "description": "Learn how to create reusable and encapsulated UI components for modern web applications."
  }
];

  const eventStartTime = new Date();
  eventStartTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

  const scheduleContainer = document.getElementById('schedule-grid');
  const searchInput = document.getElementById('category-search');

  let currentSchedule = [];

  function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  function calculateSchedule() {
    let currentTime = new Date(eventStartTime);
    let talkIndex = 0;
    const schedule = [];

    while (talkIndex < talksData.length) {
      // Add talk
      const talk = talksData[talkIndex];
      const talkStartTime = new Date(currentTime);
      const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60 * 1000);

      schedule.push({
        type: 'talk',
        ...talk,
        startTime: formatTime(talkStartTime),
        endTime: formatTime(talkEndTime)
      });
      currentTime = new Date(talkEndTime);

      talkIndex++;

      // Add transition if not the last talk and not before lunch
      if (talkIndex < talksData.length && talkIndex !== 3) { // Assuming lunch after 3rd talk
        const transitionStartTime = new Date(currentTime);
        const transitionEndTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // 10 min transition
        schedule.push({
          type: 'break',
          name: 'Transition',
          duration: 10,
          startTime: formatTime(transitionStartTime),
          endTime: formatTime(transitionEndTime)
        });
        currentTime = new Date(transitionEndTime);
      }

      // Add lunch break after the 3rd talk
      if (talkIndex === 3) {
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1 hour lunch
        schedule.push({
          type: 'break',
          name: 'Lunch Break',
          duration: 60,
          startTime: formatTime(lunchStartTime),
          endTime: formatTime(lunchEndTime)
        });
        currentTime = new Date(lunchEndTime);
      }
    }
    return schedule;
  }

  function renderSchedule(filterTerm = '') {
    scheduleContainer.innerHTML = '';
    const filteredSchedule = currentSchedule.filter(item => {
      if (item.type === 'talk') {
        const matchesCategory = item.category.some(cat =>
          cat.toLowerCase().includes(filterTerm.toLowerCase())
        );
        return matchesCategory;
      }
      return true; // Always show breaks
    });

    if (filteredSchedule.length === 0) {
      scheduleContainer.innerHTML = '<div class="no-results">No talks found matching your search.</div>';
      return;
    }

    filteredSchedule.forEach(item => {
      if (item.type === 'talk') {
        const talkCard = document.createElement('div');
        talkCard.classList.add('talk-card');
        talkCard.innerHTML = `
          <span class="time">${item.startTime} - ${item.endTime}</span>
          <h3>${item.title}</h3>
          <p class="speakers">Speaker(s): ${item.speakers.join(', ')}</p>
          <div class="categories">
            ${item.category.map(cat => `<span class="category">${cat}</span>`).join('')}
          </div>
          <p>${item.description}</p>
        `;
        scheduleContainer.appendChild(talkCard);
      } else if (item.type === 'break') {
        const breakCard = document.createElement('div');
        breakCard.classList.add('break-card');
        breakCard.innerHTML = `
              <h3>${item.name}</h3>
              <span class="time">${item.startTime} - ${item.endTime}</span>
            `;
        scheduleContainer.appendChild(breakCard);
      }
    });
  }

  currentSchedule = calculateSchedule();
  renderSchedule(); // Initial render

  searchInput.addEventListener('input', (event) => {
    renderSchedule(event.target.value);
  });
});
