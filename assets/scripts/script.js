let hero = {
  name: "Leo",
  image: "https://www.thesun.ie/wp-content/uploads/sites/3/2018/12/SNE3002LEONATOR.jpg",
  health: 100,
  attacks: [
    {
      id: 0,
      name: "Brilliant Leadership",
      damage: "10",
      dialogue: "Redacted",
      hitChance: 85,
    },
    {
      id: 1,
      name: "Fix the Economy",
      damage: "15",
      dialogue: "Redacted",
      hitChance: 70,
    },
    {
      id: 2,
      name: "Handsome Devil",
      damage: "20",
      dialogue: "Redacted",
      hitChance: 50,
    },
  ],
  kill: "The housing crisis won't be fixed overnight, and neither will your bones.",
};

let villain = {
  name: "Dear Leader",
  image: "https://cdn.openart.ai/published/djEM4QBcuxQDjO7LnN3R/S0N8VWf5_5xLU_1024.webp",
  health: 100,
  attacks: [
    {
      name: "Laser Eyes",
      damage: "15",
      dialogue: "North Korea is best Korea,",
    },
    {
      name: "Nuclear Strike",
      damage: "10",
      dialogue: "Your pain will accelerate exponentially,",
    },
    {
      name: "Summon Friend for Life",
      damage: "20",
      dialogue: "Dunk on him, Dennis,",
    },
  ],
  kill: "Your Korea is over.",
  attack() {
    let attackArrayLength = this.attacks.length;
    let randInt = Math.floor(Math.random() * attackArrayLength);
    return this.attacks[randInt];
  },
};

const heroNameElement = document.getElementById("hero-name");
const heroImageElement = document.getElementById("hero-image");
const heroHealthElement = document.getElementById("hero-health");
const villainNameElement = document.getElementById("villain-name");
const villainImageElement = document.getElementById("villain-image");
const villainHealthElement = document.getElementById("villain-health");
const attackButtonAreaElement = document.getElementById("attack-button-area");
const statusAreaElement = document.getElementById("status-area");

heroNameElement.innerText = hero.name;
heroImageElement.src = hero.image;
heroHealthElement.innerText = hero.health;
villainNameElement.innerText = villain.name;
villainImageElement.src = villain.image;
villainHealthElement.innerText = villain.health;

let playerTurn = true;

for (let attack of hero.attacks) {
  let attackName = attack.name;
  let attackId = attack.id;
  let stringToAdd = `<button type="button" data-attack-id="${attackId}" class="btn btn-dark attack-button">${attackName}</button>`;
  attackButtonAreaElement.innerHTML += stringToAdd;
}

const attackButtons = document.getElementsByClassName("attack-button");
for (let button of attackButtons) {
  button.addEventListener('click', function() {
    let attackId = this.getAttribute("data-attack-id");
    if (playerTurn) {
      playerAttack(attackId);
    }
  });
}

function playerAttack(id) {
  let chosenAttack = hero.attacks[id];
  let attackName = chosenAttack.name;
  let attackDamage = chosenAttack.damage;
  let attackQuote = chosenAttack.dialogue;
  let hitChance = chosenAttack.hitChance;
  let randInt = Math.ceil(Math.random() * 100);
  attackDamage = (randInt < hitChance) ? attackDamage : 1;
  let stringToDisplay = `"${attackQuote}" said ${hero.name}, as he used his ${attackName} attack.`;
  statusAreaElement.innerText = stringToDisplay;
  villain.health -= attackDamage;
  villainHealthElement.innerText = villain.health;
  playerTurn = false;
  let gameOver = checkGameOver();
  if (!gameOver) {
    setTimeout(villainAttack, 1000); 
  }
}

function villainAttack() {
  let chosenAttack = villain.attack();
  let attackName = chosenAttack.name;
  let attackDamage = chosenAttack.damage;
  let attackQuote = chosenAttack.dialogue;
  let stringToDisplay = `"${attackQuote}" said ${villain.name}, as he used his ${attackName} attack.`;
  statusAreaElement.innerText = stringToDisplay;
  hero.health -= attackDamage;
  heroHealthElement.innerText = hero.health;
  playerTurn = true;
  checkGameOver();
}

function checkGameOver() {
  if (hero.health <= 0) {
    playerTurn = false;
    statusAreaElement.innerHTML = villain.kill;
    return true;
  }
  else if (villain.health <= 0) {
    playerTurn = false;
    statusAreaElement.innerHTML = hero.kill;
    return true;
  }
  return false;
}