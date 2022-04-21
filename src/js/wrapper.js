import headerTemplate from "../components/header.html";
import footerTemplate from "../components/footer.html";
import descriptionTemplate from "../components/description.html";

const documentBody = document.querySelector("body");

const parseHTML = (html) => {
  const parser = new DOMParser();
  const htmlRaw = parser.parseFromString(html, "text/html");
  return htmlRaw.body.firstChild;
};

class Wrapper {
  #description = {};

  constructor(description) {
    const {
      title = "Cube Example",
      text = "This live demo shows a data app built with Cube",
    } = description;

    this.#description.title = title;
    this.#description.text = text;
  }

  #renderHeader = () =>
    documentBody.insertBefore(
      parseHTML(headerTemplate),
      documentBody.firstChild
    );

  #renderDescription = () => {
    const { title, text } = this.#description;

    const header = document.querySelector(".Header");
    documentBody.insertBefore(
      parseHTML(descriptionTemplate),
      header.nextSibling
    );

    const createPara = (inner) => {
      const description = document.querySelector(".Description");
      const para = document.createElement("p");
      para.innerHTML = inner;
      description.appendChild(para);
    };

    document.querySelector(".Description__title").innerHTML = title;
    createPara(text);
  };

  #renderFooter = () => documentBody.appendChild(parseHTML(footerTemplate));

  render = () => {
    this.#renderHeader();
    this.#renderDescription();
    this.#renderFooter();
  };
}

const createExampleWrapper = (description) => {
  try {
    const wrapper = new Wrapper(description);
    wrapper.render();
  } catch (err) {
    throw new Error(err);
  }
};

export default createExampleWrapper;
