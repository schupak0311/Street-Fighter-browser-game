interface IView {
  element?: HTMLElement;
  createElement: ({

  }: {
    tagName: string;
    className: string;
    attributes: { [key: string]: string };
  }) => HTMLElement;
}

class View implements IView {
  public element?: HTMLElement;

  public createElement({
    tagName,
    className = "",
    attributes = {}
  }: {
    tagName: string;
    className: string;
    attributes?: { [key: string]: string };
  }): HTMLElement {
    const element: HTMLElement = document.createElement(tagName);
    element.classList.add(className);

    Object.keys(attributes).forEach(key =>
      element.setAttribute(key, attributes[key])
    );

    return element;
  }
}

export default View;
