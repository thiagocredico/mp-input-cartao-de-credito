window.onload = function () {
  const name = document.getElementById('name');
  const cardnumber = document.getElementById('cardnumber');
  const securitycode = document.getElementById('securitycode');
  const expirationmonth = document.getElementById('expirationMon');
  const expirationyear = document.getElementById('expirationYear');

  //Mask the Credit Card Number Input
  var cardnumber_mask = new IMask(cardnumber, {
    mask: [
      {
        mask: '0000-0000-0000-0000',
        cardtype: 'Unknown',
      },
    ],
    dispatch: function (appended, dynamicMasked) {
      var number = (dynamicMasked.value + appended).replace(/\D/g, '');

      for (var i = 0; i < dynamicMasked.compiledMasks.length; i++) {
        let re = new RegExp(dynamicMasked.compiledMasks[i].regex);
        if (number.match(re) != null) {
          return dynamicMasked.compiledMasks[i];
        }
      }
    },
  });

  //Mask the Expiration Date
  var expirationmonth_mask = new IMask(expirationmonth, {
    mask: '00',
    blocks: {
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
      },
    },
  });

  var expirationyear_mask = new IMask(expirationyear, {
    mask: '00',
    blocks: {
      YY: {
        mask: IMask.MaskedRange,
        from: String(new Date().getFullYear()).slice(2),
        to: String(new Date().getFullYear() + 10).slice(2),
      },
    },
  });

  expirationmonth_mask.on('accept', function () {
    updateExpiration();
  });

  expirationyear_mask.on('accept', function () {
    updateExpiration();
  });

  function updateExpiration() {
    const month = expirationmonth_mask.value.padStart(2, '0');
    const year = expirationyear_mask.value.padStart(2, '0');

    if (month && year) {
      document.getElementById('svgexpire').innerHTML = month + '/' + year;
    } else {
      document.getElementById('svgexpire').innerHTML = 'MM/YY';
    }
  }

  //Mask the security code
  var securitycode_mask = new IMask(securitycode, {
    mask: '0000',
  });

  // CREDIT CARD IMAGE JS
  document.querySelector('.preload').classList.remove('preload');
  document.querySelector('.creditcard').addEventListener('click', function () {
    if (this.classList.contains('flipped')) {
      this.classList.remove('flipped');
    } else {
      this.classList.add('flipped');
    }
  });

  //On Input Change Events
  name.addEventListener('input', function () {
    if (name.value.length == 0) {
      document.getElementById('svgname').innerHTML = 'Seu Nome';
      document.getElementById('svgnameback').innerHTML = 'Seu Nome';
    } else {
      document.getElementById('svgname').innerHTML = this.value;
      document.getElementById('svgnameback').innerHTML = this.value;
    }
  });

  cardnumber_mask.on('accept', function () {
    if (cardnumber_mask.value.length == 0) {
      document.getElementById('svgnumber').innerHTML = 'XXXX-XXXX-XXXX-XXXX';
    } else {
      document.getElementById('svgnumber').innerHTML = cardnumber_mask.value;
    }
  });

  securitycode_mask.on('accept', function () {
    if (securitycode_mask.value.length == 0) {
      document.getElementById('svgsecurity').innerHTML = 'XXX';
    } else {
      document.getElementById('svgsecurity').innerHTML =
        securitycode_mask.value;
    }
  });

  //On Focus Events
  name.addEventListener('focus', function () {
    document.querySelector('.creditcard').classList.remove('flipped');
  });

  cardnumber.addEventListener('focus', function () {
    document.querySelector('.creditcard').classList.remove('flipped');
  });

  expirationmonth.addEventListener('focus', function () {
    document.querySelector('.creditcard').classList.remove('flipped');
  });

  expirationyear.addEventListener('focus', function () {
    document.querySelector('.creditcard').classList.remove('flipped');
  });

  securitycode.addEventListener('focus', function () {
    document.querySelector('.creditcard').classList.add('flipped');
  });
};
