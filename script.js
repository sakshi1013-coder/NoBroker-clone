// --- Tab Switching ---
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    contents.forEach(c => c.style.display = "none");
    const tabId = tab.getAttribute("data-tab");
    const activeContent = document.getElementById(`${tabId}-content`);
    if (activeContent) activeContent.style.display = "block";
  });
});

// --- Login/Signup Modal Logic ---
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
document.getElementById("openLogin").onclick = () => loginModal.style.display = "block";
document.getElementById("openSignup").onclick = () => signupModal.style.display = "block";
document.getElementById("closeLoginModal").onclick = () => loginModal.style.display = "none";
document.getElementById("closeSignupModal").onclick = () => signupModal.style.display = "none";
// Close modals when clicking outside


// --- Login/Signup Actions ---
document.getElementById("loginContinue").onclick = () => {
  const phone = document.getElementById("loginNumber").value.trim();
  if (!phone) return alert("Please enter your mobile number.");
  updateNavbar("User");
  loginModal.style.display = "none";
};
document.getElementById("Create").onclick = () => {
  const name = document.getElementById("Name").value.trim();
  const email = document.getElementById("Email").value.trim();
  const phone = document.getElementById("Number").value.trim();
  if (!name || !email || !phone) return alert("Please fill in all fields.");
  updateNavbar(name);
  signupModal.style.display = "none";
};

// --- Navbar Update ---
function updateNavbar(name) {
  const navbarRight = document.querySelector(".navbar-right");
  navbarRight.innerHTML = `
    <button class="btn outline"><img src="payrent.png"> | Pay rent</button>
    <button class="btn solid">Post Your Properties</button>
    <span class="username-display"> 👤${name}</span>
    <span class="divider">|</span>
    <a>☰ Menu</a>
  `;
}

// --- Profile UI Update ---
function updateProfileUI() {
  const user = JSON.parse(localStorage.getItem('user'));
  const profileOptions = document.getElementById('profileOptions');
  const profileName = document.getElementById('profileName');
  if (user) {
    profileOptions.style.display = 'inline-block';
    profileName.textContent = user.name;
    document.getElementById('openLogin').style.display = 'none';
    document.getElementById('openSignup').style.display = 'none';
  } else {
    profileOptions.style.display = 'none';
    document.getElementById('openLogin').style.display = 'inline';
    document.getElementById('openSignup').style.display = 'inline';
  }
}
document.addEventListener('DOMContentLoaded', updateProfileUI);

// --- Login/Signup with LocalStorage ---
document.getElementById('loginContinue')?.addEventListener('click', function() {
  const number = document.getElementById('loginNumber').value;
  if (number) {
    localStorage.setItem('user', JSON.stringify({ name: 'User', number }));
    updateProfileUI();
    document.getElementById('loginModal').style.display = 'none';
  }
});
document.getElementById('Create')?.addEventListener('click', function() {
  const name = document.getElementById('Name').value;
  const number = document.getElementById('Number').value;
  if (name && number) {
    localStorage.setItem('user', JSON.stringify({ name, number }));
    updateProfileUI();
    document.getElementById('signupModal').style.display = 'none';
  }
});

// --- Logout Logic ---
document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('user');
  updateProfileUI();
  // Hide dropdown after logout
  const dropdown = document.querySelector('#profileOptions .dropdown-content');
  if (dropdown) dropdown.style.display = 'none';
});

// --- Profile Dropdown Logic ---
function showProfileOptions(name) {
  document.getElementById('profileOptions').style.display = 'flex';
  document.getElementById('profileName').textContent = name || 'User';
  document.getElementById('openLogin').style.display = 'none';
  document.getElementById('openSignup').style.display = 'none';
}
document.getElementById('logoutBtn').onclick = function() {
  document.getElementById('profileOptions').style.display = 'none';
  document.getElementById('openLogin').style.display = '';
  document.getElementById('openSignup').style.display = '';
};
document.getElementById('loginContinue').onclick = function() {
  showProfileOptions('User');
  document.getElementById('loginModal').style.display = 'none';
};
document.getElementById('Create').onclick = function() {
  showProfileOptions(document.getElementById('Name').value || 'User');
  document.getElementById('signupModal').style.display = 'none';
};
document.getElementById('profileName').onclick = function (e) {
  e.stopPropagation();
  const dropdown = document.querySelector('#profileOptions .dropdown-content');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
};
document.addEventListener('click', function () {
  const dropdown = document.querySelector('#profileOptions .dropdown-content');
  if (dropdown) dropdown.style.display = 'none';
});
document.getElementById('logoutBtn').onclick = function (e) {
  e.preventDefault();
  document.getElementById('profileOptions').style.display = 'none';
  document.getElementById('openLogin').style.display = '';
  document.getElementById('openSignup').style.display = '';
  document.getElementById('profileName').textContent = 'User';
  const dropdown = document.querySelector('#profileOptions .dropdown-content');
  if (dropdown) dropdown.style.display = 'none';
};

// --- Property Type Tabs ---
const propertyTypeContent = {
  residential: `
    <div class="ad-type-row">
      <span>Select Property Ad Type</span>
      <div class="ad-type-tabs">
        <button type="button" class="active">Rent</button>
        <button type="button">Resale</button>
        <button type="button">PG/Hostel</button>
        <button type="button">Flatmates</button>
      </div>
    </div>
  `,
  commercial: `
    <div class="ad-type-row">
      <span>Select Property Ad Type</span>
      <div class="ad-type-tabs">
        <button type="button" class="active">Rent</button>
        <button type="button">Sale</button>
      </div>
    </div>
  `,
  land: `
    <div class="ad-type-row">
      <span>Select Property Ad Type</span>
      <div class="ad-type-tabs">
        <button type="button" class="active">Resale</button>
      </div>
    </div>
  `
};
// Tab switching logic
function setPropertyTab(tab) {
  document.getElementById('tab-residential').classList.remove('active');
  document.getElementById('tab-commercial').classList.remove('active');
  document.getElementById('tab-land').classList.remove('active');
  document.getElementById('tab-' + tab).classList.add('active');
  document.getElementById('property-type-content').innerHTML = propertyTypeContent[tab];
}
// Initial load for property tabs
document.addEventListener('DOMContentLoaded', function() {
  setPropertyTab('residential');
  document.getElementById('tab-residential').onclick = () => setPropertyTab('residential');
  document.getElementById('tab-commercial').onclick = () => setPropertyTab('commercial');
  document.getElementById('tab-land').onclick = () => setPropertyTab('land');
});

// --- Step Form Tabs ---
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.form-sidebar li');
  const steps = document.querySelectorAll('.step-form');
  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      steps.forEach(s => s.style.display = 'none');
      tab.classList.add('active');
      steps[idx].style.display = '';
    });
  });
  steps.forEach((s, i) => s.style.display = i === 0 ? '' : 'none');
});

// --- Plan Selection (Premium) ---
document.querySelectorAll('.select-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('selected'));
    document.querySelectorAll('.select-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    btn.closest('.plan-card').classList.add('selected');
    alert('Thank you for choosing ' + btn.closest('.plan-card').querySelector('h3').textContent + '!\nProceed to payment.');
  });
});

// --- Verified Status Helper ---
function setVerifiedStatus(isVerified) {
  localStorage.setItem('userVerified', isVerified ? 'true' : 'false');
}

// --- Update Profile UI for Verified Tick ---
function updateProfileUI() {
  const profileOptions = document.getElementById('profileOptions');
  const profileName = document.getElementById('profileName');
  const user = JSON.parse(localStorage.getItem('user'));
  const isVerified = localStorage.getItem('userVerified') === 'true';
  if (user) {
    profileOptions.style.display = 'flex';
    profileName.innerHTML = user.name
      ? user.name + (isVerified ? ' <span style="color:#009688;font-size:1.1em;vertical-align:middle;" title="Premium Verified">&#10004;</span>' : '')
      : 'User';
    document.getElementById('openLogin').style.display = 'none';
    document.getElementById('openSignup').style.display = 'none';
  } else {
    profileOptions.style.display = 'none';
    document.getElementById('openLogin').style.display = '';
    document.getElementById('openSignup').style.display = '';
  }
}

// --- Premium Plan Button Clicks ---
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.select-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      setVerifiedStatus(true);
      updateProfileUI();
    });
  });
  // On logout, remove verified status
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      setVerifiedStatus(false);
      updateProfileUI();
    });
  }
  // Also update UI on page load
  updateProfileUI();
});

// --- Map/List Toggle, Save Search, Premium Stats, Filter Premium ---
document.addEventListener('DOMContentLoaded', function () {
  // Map/List toggle
  const toggleBtn = document.getElementById('toggleViewBtn');
  const mapView = document.getElementById('mapView');
  const propertyList = document.querySelector('.property-list');
  let mapOn = false;
  toggleBtn.onclick = function() {
    mapOn = !mapOn;
    mapView.style.display = mapOn ? 'block' : 'none';
    propertyList.style.display = mapOn ? 'none' : 'grid';
    toggleBtn.textContent = mapOn ? '📋 List View' : '🗺️ Map View';
  };
  // Save search (stub)
  document.getElementById('saveSearchBtn').onclick = function() {
    alert('Search saved! You will get alerts for new matching listings.');
  };
  // Show stats if premium
  function showStatsIfPremium() {
    const isVerified = localStorage.getItem('userVerified') === 'true';
    document.getElementById('statsBox').style.display = isVerified ? 'block' : 'none';
  }
  showStatsIfPremium();
  window.addEventListener('storage', showStatsIfPremium);
  // Filter premium listings
  function filterPremiumListings() {
    const isVerified = localStorage.getItem('userVerified') === 'true';
    document.querySelectorAll('.property-card').forEach(card => {
      const isPremium = card.classList.contains('premium-listing');
      if (isPremium && !isVerified) {
        card.style.display = 'none';
      } else {
        card.style.display = '';
      }
    });
  }
  filterPremiumListings();
  window.addEventListener('storage', filterPremiumListings);
});

// --- Premium Toggle Filter, Sticky Filter, Save/Share/Map Buttons ---
document.getElementById('filter-premium').onclick = function() {
  this.classList.toggle('active');
  document.querySelectorAll('.property-card').forEach(card => {
    if (this.classList.contains('active')) {
      if (!card.classList.contains('premium')) card.style.display = 'none';
    } else {
      card.style.display = '';
    }
  });
};
// Area filter
document.getElementById('filter-area').addEventListener('input', function() {
  const val = this.value.toLowerCase();
  document.querySelectorAll('.property-card').forEach(card => {
    const title = card.querySelector('.property-title').textContent.toLowerCase();
    card.style.display = title.includes(val) ? '' : 'none';
  });
});
// Save, Share, Map buttons
document.querySelectorAll('.save-link').forEach(link => {
  link.onclick = function(e) { e.preventDefault(); alert('Listing saved!'); };
});
document.querySelectorAll('.share-link').forEach(link => {
  link.onclick = function(e) { e.preventDefault(); alert('Share link copied!'); };
});
document.querySelectorAll('.map-link').forEach(link => {
  link.onclick = function(e) { e.preventDefault(); alert('Map will open soon!'); };
});

// --- Contact/Message Request Modal ---
document.addEventListener('DOMContentLoaded', function() {
  // Show/hide visit date field based on selection
  const contactType = document.getElementById('contactType');
  const visitDateRow = document.getElementById('visitDateRow');
  contactType.addEventListener('change', function() {
    visitDateRow.style.display = (this.value === 'visit') ? '' : 'none';
  });
  // Modal open/close logic
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('closeContactModal');
  closeBtn.onclick = function() { modal.style.display = 'none'; };
  window.onclick = function(event) {
    if (event.target === modal) modal.style.display = 'none';
  };
  // Show modal with property info when "Contact Now" is clicked
  document.querySelectorAll('.property-card .primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = btn.closest('.property-card');
      const title = card.querySelector('.property-title')?.innerText || '';
      const owner = card.querySelector('.owner-row')?.innerText || '';
      const meta = card.querySelector('.property-meta')?.innerText || '';
      const area = card.querySelector('p')?.innerText || '';
      const views = card.querySelector('.views-row')?.innerText || '';
      document.getElementById('modalPropertyInfo').innerHTML = `
        <div style="font-weight:600;">${title}</div>
        <div>${owner}</div>
        <div>${meta}</div>
        <div>${area}</div>
        <div>${views}</div>
      `;
      modal.style.display = 'block';
    });
  });
  // Handle form submit
  document.getElementById('chatCallVisitForm').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('contactRequestSuccess').style.display = 'block';
    setTimeout(function() {
      document.getElementById('contactRequestSuccess').style.display = 'none';
      document.getElementById('chatCallVisitForm').reset();
      visitDateRow.style.display = 'none';
      modal.style.display = 'none';
    }, 2000);
  };
});

// --- Sidebar Open/Close and Panels ---
document.addEventListener('DOMContentLoaded', function() {
  // Open sidebar when menu is clicked
  document.querySelectorAll('.navbar-right a, .navbar-right .menu-btn').forEach(menuBtn => {
    if (menuBtn.textContent.includes('Menu') || menuBtn.classList.contains('menu-btn')) {
      menuBtn.onclick = function(e) {
        e.preventDefault();
        document.getElementById('sideMenu').classList.add('open');
        // Update profile info in sidebar
        const user = JSON.parse(localStorage.getItem('user'));
        document.getElementById('sidebarProfileName').textContent = user?.name || 'User';
        document.getElementById('sidebarVerified').style.display = (localStorage.getItem('userVerified') === 'true') ? '' : 'none';
      };
    }
  });
  // Close sidebar
  document.getElementById('closeSideMenu').onclick = function() {
    document.getElementById('sideMenu').classList.remove('open');
    document.getElementById('sidebarConnectionsPanel').style.display = 'none';
    document.getElementById('sidebarStatsPanel').style.display = 'none';
  };
  // Show stats panel
  document.getElementById('sidebarStats').onclick = function(e) {
    e.preventDefault();
    document.getElementById('sidebarStatsPanel').style.display = 'block';
    document.getElementById('sidebarConnectionsPanel').style.display = 'none';
  };
  // Show connections panel
  document.getElementById('sidebarConnections').onclick = function(e) {
    e.preventDefault();
    document.getElementById('sidebarConnectionsPanel').style.display = 'block';
    document.getElementById('sidebarStatsPanel').style.display = 'none';
    // Load connections from localStorage
    const connections = JSON.parse(localStorage.getItem('connections') || '[]');
    const list = document.getElementById('connectionsList');
    list.innerHTML = connections.length ? connections.map(c => `<li>${c}</li>`).join('') : '<li>No one has contacted you yet.</li>';
  };
});

// --- Save Connections and Stats on Contact Form Submit ---
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('chatCallVisitForm');
  if (form) {
    form.addEventListener('submit', function() {
      // Save the name from the modalPropertyInfo to connections
      const info = document.getElementById('modalPropertyInfo');
      if (info) {
        const ownerLine = Array.from(info.children).find(div => div.textContent.startsWith('Owner:'));
        if (ownerLine) {
          let connections = JSON.parse(localStorage.getItem('connections') || '[]');
          const name = ownerLine.textContent.replace('Owner:', '').trim();
          if (name && !connections.includes(name)) {
            connections.push(name);
            localStorage.setItem('connections', JSON.stringify(connections));
          }
        }
      }
      // Update stats
      let contacts = parseInt(localStorage.getItem('statContacts') || '0');
      localStorage.setItem('statContacts', contacts + 1);
      document.getElementById('statContacts').textContent = contacts + 1;
    });
  }
  // Load stats on sidebar open
  document.getElementById('sidebarStats').addEventListener('click', function() {
    document.getElementById('statContacts').textContent = localStorage.getItem('statContacts') || '0';
    // You can add more stats logic here
  });
});