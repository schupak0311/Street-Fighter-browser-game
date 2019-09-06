import View from "./view";
import FighterView from "./fighterView";
import { fighterService } from "./services/fightersService";
import { IFighter } from "./fighter";

// let fighterInfo = {}

class FightersView extends View {
  constructor(fighters: IFighter[]) {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleDbClick = this.handleDbClick.bind(this);
    this.createFighters(fighters);
  }

  fightersDetailsMap = new Map();

  private createFighters(fighters: IFighter[]): void {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(
        fighter,
        this.handleClick,
        this.handleDbClick
      );
      return fighterView.element as HTMLElement;
    });

    this.element = this.createElement({
      tagName: "div",
      className: "fighters"
    });
    this.element.append(...fighterElements);
  }

  private async handleClick(fighter: IFighter): Promise<void> {
    let fighterInfo: IFighter = await fighterService.getFighterDetails(
      fighter._id as number
    );

    // let name = fighterInfo.name
    let fighterInfoArr: Array<string | number> = [
      fighterInfo.name,
      fighterInfo.health,
      fighterInfo.attack,
      fighterInfo.defense
    ];

    let modal = document.getElementById("myModal") as HTMLElement;
    let nm = document.getElementById("nm") as HTMLElement;
    let ht = document.getElementById("ht") as HTMLElement;
    let at = document.getElementById("at") as HTMLElement;
    let df = document.getElementById("df") as HTMLElement;
    nm.innerHTML = fighterInfoArr[0] as string;
    ht.innerHTML = fighterInfoArr[1] as string;
    at.innerHTML = fighterInfoArr[2] as string;
    df.innerHTML = fighterInfoArr[3] as string;

    modal.style.display = "block";
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  private async handleDbClick(fighter: IFighter): Promise<void> {
    let fighterInfo: IFighter = await fighterService.getFighterDetails(
      fighter._id as number
    );

    if (this.fightersDetailsMap.has(fighter._id)) {
      console.log("already in collection");
      this.fightersDetailsMap.delete(fighter._id);
    } else {
      this.fightersDetailsMap.set(fighter._id, fighterInfo);
    }
  }
}

export default FightersView;
