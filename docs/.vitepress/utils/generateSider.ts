import path from "path";
import { readdirSync } from "fs";
import {
  ISideBar,
  docsPath,
  checkIsDirectiory,
  checkIsWhiteList,
  SiderBarItem,
} from "./puclic";

const returnRealFile = (filePath: string) => {
  const siderBarItem = [] as SiderBarItem[];
  let files = readdirSync(filePath);
  files = files.map((item) => {
    return {};
  }) as SiderBarItem[];
  siderBarItem.push(...files);
  console.log(files);
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

  console.log(sidebar);
  return sidebar;
}
