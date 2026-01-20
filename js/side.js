function MainModule(listingsID = "#listings") {
  const me = {};


  const listingsElement = document.querySelector(listingsID);
  const sideElement = document.querySelector("#side");

  function getListingCode(listing) {
    return `<div class="col-lg-4 col-md-6">
  <div id="listing" class="card">
    <a href="./side.html?id=${listing.id}">
      <img
      src="https://a0.muscache.com/pictures/b7c2a199-4c17-4ba6-b81d-751719d2dac6.jpg"
      class="card-img-top"
      alt="AirBNB Listing"
      />
    </a>
    <div class="card-body">
      <h4 class="card-title">${listing.name.substring(0,100)}..."</h4>
      <div>${listing.price}</div>
      <p class="card-text">${listing.description}</p>
      <a href="./side.html?id=${listing.id}" class="btn btn-primary">View Listing</a>
    </div>
  </div>
  <!-- /card -->
  </div>`;
  }

  function getQueryId() {
    return new URLSearchParams(window.location.search).get('id');
  }

  function renderSide(listing) {
    sideElement.innerHTML = `
      <div class="col-12">
        <div class="card">
          <a href="${listing.listing_url}">
                <img
                  src="https://a0.muscache.com/pictures/b7c2a199-4c17-4ba6-b81d-751719d2dac6.jpg"
                  class="card-img-top"
                  alt="AirBNB Listing"
                />
            </a>
          <div class="card-body">
            <h4 class="card-title">${listing.name}</h4>
            <div><strong>Price: </strong>${listing.price}</div>
            <div><strong>Description:</strong></div>
            <p class="card-text">${listing.description}</p>
            <div><strong>Amenities:</strong>\n${listing.amenities.replace("[", "").replace("]", "").replaceAll("\\u", " ").replaceAll("\"", "").replace(/(<([^>]+)>)/ig, '')}</div>
          </div>
          <a href="./index.html" class="btn btn-secondary">Back to listings</a>
        </div>
      </div>`;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    const res = await fetch("./airbnb_sf_listings_500.json");
    const listings = await res.json();

    me.redraw(listings.slice(0, 50));

    const id = getQueryId();
    if (id) {
      const item = listings.find(l => String(l.id) === String(id));
      if (item) {
        renderSide(item);
        return;
      }
    }
  }

  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();


main.loadData();