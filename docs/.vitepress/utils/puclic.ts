import path from "path";
import { statSync } from "fs";
const whiteList = [".vitepress", "components"];

export interface INavbarItem {
  text: string;
  link: string;
}

export interface SiderBarItem {
  text?: string;
  collapsed?: boolean;
  items?: SiderBarItem[];
}

export interface ISideBar {
  [path: string]: SiderBarItem[];
}

export const docsPath = path.join(__dirname, "../../../docs");

/**
 * 检查是否为目录
 * @param name
 * @returns boolean
 */
export const checkIsDirectiory = (path: string) => {
  const stats = statSync(path);
  return stats.isDirectory();
};

/**
 * 检查是否被白名单包含
 * @param path
 * @returns boolean
 */
export const checkIsWhiteList = (path: string) => {
  return whiteList.indexOf(path) === -1;
};
