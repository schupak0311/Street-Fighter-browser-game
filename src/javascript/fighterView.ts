import { IFighter } from "./fighter";
import View from "./view";

class FighterView extends View {
  constructor(
    fighter: IFighter,
    handleClick: (fighter: IFighter) => Promise<void>,
    handleDbClick: (fighter: IFighter) => Promise<void>
  ) {
    super();

    this.createFighter(fighter, handleClick, handleDbClick);
  }

  createFighter(
    fighter: IFighter,
    handleClick: (fighter: IFighter) => Promise<void>,
    handleDbClick: (fighter: IFighter) => Promise<void>
  ): void {
    const { _id, name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);
    const createStats = this.createStats();

    const checkBox = this.createElement({
      tagName: "input",
      className: "choose",
      attributes: {
        type: "checkbox",
        id: `fighter-${_id}`,
        name: "check"
      }
    });

    this.element = this.createElement({
      tagName: "div",
      className: "fighter"
    });
    this.element.setAttribute("id", `fighter-${fighter.name}`);
    this.element.append(createStats, checkBox, imageElement, nameElement);
    createStats.addEventListener("click", () => handleClick(fighter), false);

    let element = this.element;
    this.element.addEventListener(
      "change",
      () => {
        const checked = document.querySelector(
          `#fighter-${_id}:checked`
        ) as HTMLElement;
        if (checked) {
          handleDbClick(fighter);
          element.style.backgroundColor = "green";
        } else {
          element.style.backgroundColor = "";
        }
      },
      false
    );
  }

  createName(name: string): HTMLElement {
    const nameElement = this.createElement({
      tagName: "div",
      className: "name"
    });
    nameElement.innerText = name;

    return nameElement;
  }

  createStats(): HTMLElement {
    const nameElement = this.createElement({
      tagName: "div",
      className: "stats"
    });
    nameElement.setAttribute("id", "stats");
    nameElement.innerText = "Stats";

    return nameElement;
  }

  createImage(source: string): HTMLElement {
    const attributes = {
      src: source
    };
    const imgElement = this.createElement({
      tagName: "img",
      className: "fighter-image",
      attributes
    });

    return imgElement;
  }
}

export default FighterView;
