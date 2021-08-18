const Handlebars = require('handlebars');
module.exports = {

  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },
  format_url: url => {
    return url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0];
  },
  format_plural: (word, amount) => {
    if (amount == 1) {
      return word;

    }
    return `${word}s`;
  },
  format_category: post => {
    return post[0];
  },
  format_type: rates => {
    let own = false;
    rates.forEach(data => {
      if (data.owned == true) {
        rate = data.rating;
        own = true;
      };
    })
    if (own) return `put`;
    else return 'post';
  },
  format_rating: rates => {
    let own = false;
    let rate;
    rates.forEach(data => {
      if (data.owned == true) {
        rate = data.rating;
        own = true;
      };
    });

    if (own) {
      if (rate == 1) {
        let doc =
          `<input type="radio" id="star5" name="rating" value="5" />
            <label for="star5" title="5 star"></label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label for="star4" title="4 star"></label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label for="star3" title="3 star"></label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label for="star2" title="2 star"></label>
            <input type="radio" id="star1" name="rating" value="1" checked/>
            <label for="star1" title="1 star"></label>`
        return new Handlebars.SafeString(doc);
      }
      if (rate == 2) {
        let doc =
          `<input type="radio" id="star5" name="rating" value="5" />
            <label for="star5" title="5 star"></label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label for="star4" title="4 star"></label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label for="star3" title="3 star"></label>
            <input type="radio" id="star2" name="rating" value="2" checked/>
            <label for="star2" title="2 star"></label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label for="star1" title="1 star"></label>`
        return new Handlebars.SafeString(doc);
      }
      if (rate == 3) {
        let doc =
          `<input type="radio" id="star5" name="rating" value="5" />
            <label for="star5" title="5 star"></label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label for="star4" title="4 star"></label>
            <input type="radio" id="star3" name="rating" value="3" checked/>
            <label for="star3" title="3 star"></label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label for="star2" title="2 star"></label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label for="star1" title="1 star"></label>`
        return new Handlebars.SafeString(doc);
      }
      if (rate == 4) {
        let doc =
          `<input type="radio" id="star5" name="rating" value="5" />
            <label for="star5" title="5 star"></label>
            <input type="radio" id="star4" name="rating" value="4" checked/>
            <label for="star4" title="4 star"></label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label for="star3" title="3 star"></label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label for="star2" title="2 star"></label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label for="star1" title="1 star"></label>`
        return new Handlebars.SafeString(doc);
      }
      if (rate == 5) {
        let doc =
          `<input type="radio" id="star5" name="rating" value="5" checked/>
            <label for="star5" title="5 star"></label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label for="star4" title="4 star"></label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label for="star3" title="3 star"></label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label for="star2" title="2 star"></label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label for="star1" title="1 star"></label>`
        return new Handlebars.SafeString(doc);
      }
    }
    else {
      let doc =
        `<input type="radio" id="star5" name="rating" value="5" />
            <label for="star5" title="5 star"></label>
            <input type="radio" id="star4" name="rating" value="4" />
            <label for="star4" title="4 star"></label>
            <input type="radio" id="star3" name="rating" value="3" />
            <label for="star3" title="3 star"></label>
            <input type="radio" id="star2" name="rating" value="2" />
            <label for="star2" title="2 star"></label>
            <input type="radio" id="star1" name="rating" value="1" />
            <label for="star1" title="1 star"></label>`
      return new Handlebars.SafeString(doc);
    }

  },
  format_card_rating: rates => {
    let own = false;
    let rate;
    rates.forEach(data => {
      if (data.owned == true) {
        rate = data.rating;
        own = true;
      };
    });

    if (own) {
      if (rate == 5) {
        let doc =
          `
          <i class="fas fa-star "></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
      `
        return new Handlebars.SafeString(doc);
      }
      if (rate == 4) {
        let doc =
          `
          <i class="fas fa-star "></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="far fa-star"></i>
      `
        return new Handlebars.SafeString(doc);
      }
      if (rate == 3) {
        let doc =
          `
          <i class="fas fa-star "></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
      `
        return new Handlebars.SafeString(doc);
      }
      if (rate == 2) {
        let doc =
          `
          <i class="fas fa-star "></i>
          <i class="fas fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
      `
        return new Handlebars.SafeString(doc);
      }
      if (rate == 1) {
        let doc =
          `
          <i class="fas fa-star "></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
      `
        return new Handlebars.SafeString(doc);
      }
    }
    else {
      let doc =
        `
          <i class="far fa-star "></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
      `
      return new Handlebars.SafeString(doc);
    }

  }
}
