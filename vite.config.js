import { devConfig } from "./config/tasks/dev";
import { prodConfig } from "./config/tasks/prod";

export default ({ mode }) => {
   if (mode === "development") {
      return devConfig;
   } else if (mode === "production") {
      return prodConfig;
   }
};
