let coins = 100;
let hasLost = false;
let totalLoss = 0;
let totalWin = 0;
const LOSS_LIMIT = 50;
const WIN_MULTIPLIER = 2;

document.getElementById("coins").innerText = `Coins: ${coins}`;

function calc({ amount, profit }) {
  let win = false;
  profit = -amount;

  if (totalWin < totalLoss) {
    if (Math.random() <= 0.5 && hasLost) {
      win = true;
      profit = amount * WIN_MULTIPLIER - amount;
    }
  }
  return { win, profit };
}

function guessCard(selectedCard) {
  if (coins < 5) {
    document.getElementById("message").innerText = "Not enough coins to play.";
    return;
  }

  const cards = ["spade", "love"];
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  const amount = 5;
  const result = calc({ amount, profit: coins - amount });

  if (randomCard === "spade") {
    if (!hasLost) {
      // paksa kalah jika user belum kalah
      result.win = false;
      result.profit = -amount;
    } else if (totalWin >= totalLoss) {
      // Cegah kemenangan jika total kemenangan melebihi total kekalahan
      result.win = false;
      result.profit = -amount;
    } else {
      result.win = true;
      result.profit = amount * WIN_MULTIPLIER - amount;
    }
  }

  coins += result.profit;

  const messageElement = document.getElementById("message");
  if (result.win && selectedCard === "card1" && randomCard === "spade") {
    messageElement.innerText = "selamat!! kamu benar";
    messageElement.classList.remove("lose");
    messageElement.classList.add("win");
  } else if (result.win && selectedCard === "card2" && randomCard === "spade") {
    messageElement.innerText = "selamat!! kamu benar";
    messageElement.classList.remove("lose");
    messageElement.classList.add("win");
  } else {
    messageElement.innerText = "yah kamu kalah, coba lagi";
    messageElement.classList.remove("win");
    messageElement.classList.add("lose");
  }

  if (!result.win) {
    hasLost = true;
    totalLoss += amount;
  } else {
    totalWin += result.profit + amount;
  }

  document.getElementById("coins").innerText = `Coins: ${coins}`;
}
