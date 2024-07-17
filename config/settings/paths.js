// import { basename, resolve } from "path";

// const projectFolder = basename(resolve());
// const buildFolder = `./dist`; //Можно использовать projectFolder
const srcFolder = `./src`;

export const paths = {
   src: {
      spriteIcons: `${srcFolder}/assets/icons/**/*.svg`,
      favIcon: `${srcFolder}/assets/favicon.svg`,
   },
};
