import { CookArenaProps } from "../interfaces/cook-arena-interface";
import { P5Drawer } from "./drawer";

const customColor = 255;
const opasity = 0;
const numberForRandomColor = 16777215;
const hexadecimalSystem = 16;

const withDiscoModeArena = (CookArena: React.FC<CookArenaProps>) => {
  const WithDiscoModeArena = (props: any) => {

    const setDefaultStyle = (p5Drawer: P5Drawer) => {
    p5Drawer.setBackground(customColor.toString(), opasity);
		document.querySelector(".recipe-cook-page")?.setAttribute("style", `background-color: #242633; color: 'white;`);
		document.querySelector(".recipe-side")?.setAttribute("style", `background-color: none;`);
	};

    const triggerDiscoMode = (p5Drawer: P5Drawer, discoColor: boolean) => {
      if (discoColor) {
        const randomColor = () =>
          "#" + Math.floor(Math.random() * numberForRandomColor).toString(hexadecimalSystem);

        p5Drawer.setBackground(randomColor());
        document.querySelector(".recipe-cook-page")?.setAttribute(
          "style",
          `background-color: ${randomColor()}; color: ${randomColor()};`
        );
        document
          .querySelector(".recipe-side")
          ?.setAttribute("style", `background-color: ${randomColor()};`);
      } else {
        setDefaultStyle(p5Drawer);
      }
    };

    return <CookArena triggerDiscoMode={triggerDiscoMode} {...props} />;
  };

  return WithDiscoModeArena;
};

export default withDiscoModeArena;
