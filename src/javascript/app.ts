import FightersView from "./fightersView";
import { fighterService } from "./services/fightersService";
import startFight from "./fighter";

class App {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById("info") as HTMLElement;
  static button = document.getElementById("button") as HTMLButtonElement;
  static loadingElement = document.getElementById(
    "loading-overlay"
  ) as HTMLElement;

  private async startApp(): Promise<void> {
    try {
      App.loadingElement.style.visibility = "visible";

      const fighters = await fighterService.getFighters();
      const fightersView = new FightersView(fighters);
      const fightersElement = fightersView.element;

      App.rootElement.appendChild(fightersElement as HTMLElement);

      App.button.addEventListener("click", e => {
        e.preventDefault();
        if (fightersView.fightersDetailsMap.size === 2) {
          const x = document.getElementsByClassName("choose")[0] as HTMLElement;
          x.style.display = "none";
          const x1 = document.getElementsByClassName(
            "choose"
          )[1] as HTMLElement;
          x1.style.display = "none";
          App.button.style.display = "none";
          startFight(fightersView.fightersDetailsMap);
        } else {
          alert("You have to choice 2 fighters");
        }
      });
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = "Failed to load data";
    } finally {
      App.loadingElement.style.visibility = "hidden";
    }
  }
}

export default App;
