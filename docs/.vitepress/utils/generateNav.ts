import path from "path";
import { readdirSync, statSync } from "fs";

/**
 * 判断是否为markdown文件
 *
 * @param   {string}  fileName  文件名
 *
 * @return  {[boolean]}         有返回值则表示是markdown文件,否则不是
 */
function isMarkdownFile(fileName: string) {
  return fileName.match(/.+\.md$/);
}

interface NavGenerateConfig {
  /**
   * 是否启用路由匹配显示激活状态. 默认:false
   */
  enableDirActiveMatch: boolean;
  /**
   * 需要遍历的目录. 默认:articles
   */
  dirName?: string;
  /**
   * 最大遍历层级. 默认:1
   */
  maxLevel?: number;
}

export function getNavData(navGenerateConfig: NavGenerateConfig) {
  const {
    enableDirActiveMatch,
    dirName = "articles",
    maxLevel = 1,
  } = navGenerateConfig;
  const dirFullPath = path.resolve(__dirname, `../${dirName}`);
  const result = getNavDataArr(dirFullPath, 1, maxLevel, enableDirActiveMatch);
  // console.log('navData')
  // console.log(result)
  return result;
}
interface NavItem {
  text: string;
  link?: string;
  activeMatch?: string;
  children?: NavItem[];
}
/**
 * 获取顶部导航数据
 *
 * @param   {string}     dirFullPath  当前需要遍历的目录绝对路径
 * @param   {number}     level        当前层级
 * @param   {number[]}   maxLevel     允许遍历的最大层级
 * @param   {boolean}    enableActiveMatch 是否启用路由匹配显示激活状态
 *
 * @return  {NavItem[]}               导航数据数组
 */
function getNavDataArr(
  dirFullPath: string,
  level: number,
  maxLevel: number,
  enableActiveMatch: boolean
): NavItem[] {
  // 获取所有文件名和目录名
  const allDirAndFileNameArr = readdirSync(dirFullPath);
  const result: NavItem[] = [];
  allDirAndFileNameArr.map((fileOrDirName: string, idx: number) => {
    const fileOrDirFullPath = path.join(dirFullPath, fileOrDirName);
    const stats = statSync(fileOrDirFullPath);
    const link = fileOrDirFullPath
      .split("docs")[1]
      .replace(".md", "")
      .replace(/\\/g, "/");
    const text = fileOrDirName.match(/^[0-9]{2}-.+/)
      ? fileOrDirName.substring(3)
      : fileOrDirName;
    if (stats.isDirectory()) {
      // 当前为文件夹
      const dirData: NavItem = {
        text,
        link: `${link}/`,
      };
      if (level !== maxLevel) {
        dirData.children = getNavDataArr(
          fileOrDirFullPath,
          level + 1,
          maxLevel,
          enableActiveMatch
        );
      }
      if (enableActiveMatch) {
        dirData.activeMatch = link + "/";
      }
      result.push(dirData);
    } else if (isMarkdownFile(fileOrDirName)) {
      // 当前为文件
      const fileData: NavItem = {
        text,
        link: link,
      };
      if (enableActiveMatch) {
        fileData.activeMatch = link + "/";
      }
      result.push(fileData);
    }
  });
  return result;
}
