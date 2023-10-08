document.addEventListener('DOMContentLoaded', (event) => {
    const searchInput = document.querySelector('.search-bar input');
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      fetch('data.json')
        .then(response => response.json())
        .then(json => {
          const filteredData = json.filter(company => {
            return company.name.toLowerCase().includes(query) ||
                   company.address.toLowerCase().includes(query) ||
                   company.phone.includes(query);
          });
          renderCards(filteredData);
        });
    });
  
    // Fetch the data and initially render all cards
    fetch('data.json')
      .then(response => response.json())
      .then(json => {
        renderCards(json);
      });
  });
  
  function renderCards(filteredData) {
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = '';  // Clear any existing cards
    filteredData.forEach(company => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="info">
          <div class="company-name">${company.name}</div>
          <div class="phone">${company.phone}</div>
          <div class="address">${company.address}</div>
        </div>
        <a href="${company.website}" target="_blank"><button>Website</button></a>
      `;
      cardsContainer.appendChild(card);
    });
  }
  