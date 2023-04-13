import path from "path";
import { readdirSync } from "fs";
import {
  INavbarItem,
  checkIsDirectiory,
  checkIsWhiteList,
  docsPath,
} from "./puclic";

export default function () {
  const navbar = [{ text: "首页", link: "/" }] as INavbarItem[];
  const docsItem = readdirSync(docsPath);

  docsItem.forEach((file) => {
    const filePath = path.join(docsPath, file);
    if (checkIsDirectiory(filePath) && checkIsWhiteList(file)) {
      navbar.push({
        text: file,
        link: `/${file}/`,
      });
    }
  });

  return navbar;
}
