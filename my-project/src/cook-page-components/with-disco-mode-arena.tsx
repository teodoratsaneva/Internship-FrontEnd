import { useRef } from "react";
import { P5Drawer } from "../cook-page-components/drawer";

const customColor = 255;
const opasity = 0;

const withDiscoModeArena = (CookArena) => {
  const WithDiscoModeArena = (props, p5Drawer: P5Drawer) => {
    const discoColor = useRef(false);

    const setDefaultStyle = () => {
		p5Drawer.background(customColor, opasity);
		document.querySelector(".recipe-cook-page")?.setAttribute("style", `background-color: #242633; color: 'white;`);
		document.querySelector(".recipe-side")?.setAttribute("style", `background-color: none;`);
	};

    const triggerDiscoMode = () => {
      if (discoColor.current) {
        const randomColor = () =>
          "#" + Math.floor(Math.random() * 16777215).toString(16);

        p5Drawer.background(randomColor());
        document.querySelector(".recipe-cook-page")?.setAttribute(
          "style",
          `background-color: ${randomColor()}; color: ${randomColor()};`
        );
        document
          .querySelector(".recipe-side")
          ?.setAttribute("style", `background-color: ${randomColor()};`);
      } else {
        setDefaultStyle();
      }
    };

    return <CookArena triggerDiscoMode={triggerDiscoMode} {...props} />;
  };

  return WithDiscoModeArena;
};

export default withDiscoModeArena;
