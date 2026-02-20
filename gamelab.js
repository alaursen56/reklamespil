/* variabler */
var fart = -5;
var tyngdeaccelerationen = 0.5;
var score = 5;
var gameState = "start";
var timer = 20;

var baggrund = [
  createSprite(World.width * 0.5, World.height * 0.5),
  createSprite(World.width * 1.5, World.height * 0.5)
];

for (var i = 0; i < 2; i++) {
  baggrund[i].setAnimation("baggrunden");
  baggrund[i].width = World.width;
  baggrund[i].height = World.height;
  baggrund[i].velocityX = fart * 0.4;
}

var player = createSprite(World.width * 0.5, World.height * 0.5);
player.setAnimation("f35");
player.play();
player.scale = 0.7;

var logo = createSprite(365, 40);
logo.setAnimation("forsvaretlogo");
logo.scale = 0.5;

var enemybird = createSprite(350, 100);
enemybird.setAnimation("enemybird");
enemybird.scale = 0.1;
enemybird.velocityX = -7;
enemybird.velocityY = 0;

function opdater() {
  for (var i = 0; i < 2; i++) {
    if (baggrund[i].x <= -World.width * 0.5) {
      baggrund[i].x += World.width * 2;
    }
  }
}

function nyFugl() {
  enemybird = createSprite(
    World.width + 50,
    randomNumber(50, World.height - 100)
  );
  enemybird.setAnimation("enemybird");
  enemybird.scale = 0.1;
  enemybird.velocityX = randomNumber(-11, -5);
}

function draw() {
  if (gameState === "start") {
    background("black");
    textSize(25);
    fill("white");
    text("PILOTTESTEN", 113, 130);

    textSize(17);
    text("For at starte, skal du trykke på [MELLEMRUM].\n" +"Du styrer også flyet med mellemrum.\n" + "Du har 20 sekunder, held og lykke!",25, 170);

    fill("grey");
    text("forsvaret.dk", 295, 385);

    if (keyDown("space")) {
      gameState = "play";
    }
  }

  if (gameState === "play") {
    opdater();

    var ac = tyngdeaccelerationen;
    if (keyDown("space")) {
      ac = -tyngdeaccelerationen * 2;
      player.nextFrame();
    } else {
      player.play();
    }

    if (enemybird.x < -50) {
      enemybird.remove();
      nyFugl();
    }

    if (player.isTouching(enemybird)) {
      score = score - 1;
      enemybird.remove();
      nyFugl();
    }

    player.velocityY += ac;

    if (player.y < 0) {
      player.y = 0;
      player.velocityY = 0;
    }

    if (player.y > World.height - player.height) {
      player.y = World.height - player.height;
      player.velocityY = 0;
    }

    drawSprites();

    textSize(12);
    fill("gray");
    text("Score:", 5, 15);
    text(score, 70, 15);
    text("Du har:", 5, 30);
    timer = timer - 0.033;
    text(Math.round(timer) + " s tilbage", 70, 30);

    if (timer < 1 || score < 1) {
      gameState = "gameover";
    }
  }

  if (gameState === "gameover") {
    drawSprites();
    background("black");
    textAlign(CENTER);
    fill("white");

    textSize(26);
    if (score < 1) {
      text("Du mistede alle dine point!", 200, 170);
      textSize(14);
      text("Meld dig som pilot i forsvaret på forsvaret.dk/pilot", 200, 200);
    } else {
      textSize(20);
      text("Tiden løb ud!\nDine point: " + score, 200, 150);
      textSize(14);
      text("Meld dig som pilot i forsvaret på forsvaret.dk/pilot", 200, 200);
    }
  }
}
