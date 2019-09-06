let attackPower = 0;
let defensePower = 0;

export interface IFighter {
  _id?: number;
  name: string;
  health: number;
  attack: number;
  defense: number;
  source: string;

  setDamage(damage: number): void;
}

class Fighter implements IFighter {
  public name: string;
  public health: number;
  public attack: number;
  public defense: number;
  public source: string;

  constructor(
    name: string,
    health: number,
    attack: number,
    defense: number,
    source: string
  ) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.source = source;
  }

  public setDamage(damage: number): void {
    this.health -= damage;
  }

  public getHitPower(attack: number): number {
    let criticalHitChance = Math.floor(Math.random() * 2) + 1;
    attackPower = attack * criticalHitChance;
    return attackPower;
  }

  public getBlockPower(defense: number): number {
    let dodgeChance = Math.floor(Math.random() * 2) + 1;
    defensePower = defense * dodgeChance;
    return defensePower;
  }

  hit(attackPower: number, defensePower: number, enemy: Fighter): void {
    let damage = attackPower - defensePower;
    enemy.setDamage(damage);
  }
}

export default function startFight(fightersMap: Map<string, IFighter>) {
  let fighterEL1 = document.getElementById(
    `fighter-${Array.from(fightersMap)[0][1].name}`
  ) as HTMLElement;
  let fighterEL2 = document.getElementById(
    `fighter-${Array.from(fightersMap)[1][1].name}`
  ) as HTMLElement;
  let howToUseDiv = document.getElementById("htu") as HTMLElement;
  howToUseDiv.style.display = "none";
  fighterEL1.setAttribute("style", "transform: translateX(-300px);");
  fighterEL2.setAttribute(
    "style",
    "transform: translateX(300px) scaleX(1); filter: FlipH;"
  );

  let fighterName1: any = fighterEL1.childNodes;
  fighterName1[0].style.display = "none";
  let fighterName2: any = fighterEL2.childNodes;
  fighterName2[0].style.display = "none";
  fighterName2[2].style.transform = "scale(-1,1)";

  let fighterInfo1: IFighter = Array.from(fightersMap)[0][1];
  let fighterInfo2: IFighter = Array.from(fightersMap)[1][1];

  let fightersToHide = document.getElementsByClassName("fighter") as any;
  Array.prototype.forEach.call(fightersToHide, function(_el, index) {
    if (
      fightersToHide[index].id !== fighterEL1.id &&
      fightersToHide[index].id !== fighterEL2.id
    ) {
      fightersToHide[index].style.display = "none";
    }
  });

  let img = new Image();
  let div = document.getElementById("info") as HTMLElement;
  img.setAttribute("id", "image");
  img.onload = function() {
    div.appendChild(img);
  };
  img.src = "../../resources/fight.png";

  setTimeout(() => {
    showFight(fighterInfo1, fighterInfo2, fighterEL1, fighterEL2);
  }, 2000);
}

function showFight(
  firstFighterInfo: IFighter,
  secondFighterInfo: IFighter,
  fighterEL1: HTMLElement,
  fighterEL2: HTMLElement
) {
  let fighter1 = new Fighter(
    firstFighterInfo.name,
    firstFighterInfo.health,
    firstFighterInfo.attack,
    firstFighterInfo.defense,
    firstFighterInfo.source
  );
  let fighter2 = new Fighter(
    secondFighterInfo.name,
    secondFighterInfo.health,
    secondFighterInfo.attack,
    secondFighterInfo.defense,
    firstFighterInfo.source
  );
  let round = 0;
  let fightImage = document.getElementById("image") as HTMLElement;
  fightImage.style.display = "none";

  function fight(fighter1: Fighter, fighter2: Fighter) {
    if (!(fighter1.health > 0 && fighter2.health > 0)) {
      let winner = fighter1.health > 0 ? fighter1 : fighter2;
      let loser = fighter1.health <= 0 ? fighter1 : fighter2;

      return showResult(winner, loser, round);
    }

    round++;

    if (round % 2 == 0) {
      fighterEL1.style.left = "68%";
      fighterEL2.style.right = "66%";
      attackPower = fighter1.getHitPower(fighter1.attack);
      defensePower = fighter2.getBlockPower(fighter1.defense);
      // console.log(attackPower, defensePower)
      fighter1.hit(attackPower, defensePower, fighter2);

      fighterEL2.style.backgroundColor = "red";

      showHealth2(fighterEL2, fighter2);

      setTimeout(function() {
        fighterEL1.style.left = "5%";
        fighterEL2.style.right = "5%";
        fighterEL2.style.backgroundColor = "#F6F6F6";
      }, 800);
    } else {
      fighterEL2.style.right = "66%";
      fighterEL1.style.left = "68%";
      attackPower = fighter2.getHitPower(fighter2.attack);
      defensePower = fighter1.getBlockPower(fighter2.defense);
      // console.log(attackPower, defensePower)
      fighter2.hit(attackPower, defensePower, fighter1);
      fighterEL1.style.backgroundColor = "red";
      showHealth1(fighterEL1, fighter1);

      setTimeout(function() {
        fighterEL2.style.right = "5%";
        fighterEL1.style.left = "5%";
        fighterEL1.style.backgroundColor = "#F6F6F6";
      }, 800);
    }

    setTimeout(function() {
      fight(fighter1, fighter2);
    }, 1500);
  }

  setTimeout(function() {
    fight(fighter1, fighter2);
  }, 500);

  function showHealth1(fighterEL: HTMLElement, fighter: Fighter) {
    let hp = document.createElement("span");
    hp.setAttribute("class", "hp");
    hp.style.color = "blue";
    hp.style.transition = "1s";
    hp.style.fontSize = "20px";
    hp.innerHTML = `Health: ${fighter.health}`;
    fighterEL.append(hp);
    setTimeout(function() {
      hp.style.display = "none";
    }, 800);
  }

  function showHealth2(fighterEL: HTMLElement, fighter: Fighter) {
    let hp = document.createElement("span") as HTMLElement;
    hp.setAttribute("class", "hp");
    hp.style.color = "blue";
    hp.style.transition = "1s";
    hp.style.fontSize = "20px";
    // hp.style.transform = "scale(-1,1)"
    hp.innerHTML = `Health: ${fighter.health}`;
    fighterEL.append(hp);
    setTimeout(function() {
      hp.style.display = "none";
    }, 800);
  }

  function showResult(winner: Fighter, loser: Fighter, round: number) {
    let result = document.getElementById("info") as HTMLElement;
    let ko = new Image();
    ko.setAttribute("class", "ko");
    ko.onload = function() {
      result.appendChild(ko);
    };
    ko.src = "../../resources/ko.png";

    let div = document.createElement("h4");
    let textNode = document.createTextNode(
      `In round  ${round} - ${winner.name} win! Fight Results: 1. ${
        winner.name
      }: ${winner.health}hp 2. ${loser.name}: ${loser.health}hp`
    );
    div.appendChild(textNode);
    result.appendChild(div);
  }
}
