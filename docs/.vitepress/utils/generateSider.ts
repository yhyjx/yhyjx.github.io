import path from "path";
import { readdirSync } from "fs";
import {
  ISideBar,
  docsPath,
  checkIsDirectiory,
  checkIsWhiteList,
  SiderBarItem,
} from "./puclic";

const returnChild = (itemPath: string) => {
  const siderBarItem = [] as SiderBarItem[];
  const files = readdirSync(itemPath);
  files.forEach((item) => {
    if (item !== "index.md") {
      const obj: SiderBarItem = {
        text: item.split(".")[0],
        link: `${itemPath.split("docs")[1]}/${item}`,
      };
      siderBarItem.push(obj);
    }
  });

  return siderBarItem;
};

const returnRealFile = (filePath: string) => {
  const siderBarItem = [] as SiderBarItem[];
  let files = readdirSync(filePath);
  files = files.map((item) => {
    if (item.indexOf(".md")) {
    }
    return item;
  });

  files.forEach((item) => {
    if (item !== "index.md") {
      const obj: SiderBarItem = {
        text: item,
      };
      const itemPath = path.join(filePath, item);
      if (checkIsDirectiory(itemPath)) {
        obj.items = returnChild(itemPath);
        obj.collapsed = true;
      } else {
        obj.link = itemPath.split("docs")[1];
      }
      siderBarItem.push(obj);
    }
  });

  return siderBarItem;
};

export default function generateSider() {
  const sidebar: ISideBar = {};
  const docsItem = readdirSync(docsPath);

  docsItem.forEach((file) => {
    const filePath = path.join(docsPath, file);
    if (checkIsDirectiory(filePath) && checkIsWhiteList(file)) {
      sidebar[file] = returnRealFile(filePath);
    }
  });

  return sidebar;
}
