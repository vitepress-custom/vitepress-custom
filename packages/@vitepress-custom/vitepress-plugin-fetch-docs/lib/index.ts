import fs from 'fs-extra';
import globby from 'globby';
import matter from 'gray-matter';

// 排序
let compareDate = function (obj1: pageType, obj2: pageType) {
    return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1;
};
interface pageType {
    frontMatter: frontMatterType,
    regularPath: string,
    relativePath: string;
    content: string;
}
interface frontMatterType {
    page: any;
    date: any;
}
// 获取所有md文件
export default async () => {
    const paths = await globby(["**.md"], {
        ignore: ["node_modules", "README.md", "packages"],//忽略文件
    });
    let pages = await Promise.all(
        paths.map(async (item: string) => {
            const content = await fs.readFile(item, "utf-8");
            const { data } = matter(content);
            let matterData = matter(content);
            return {
                frontMatter: matterData.data,
                link: item,
                content: matterData.content.replace(/[^a-zA-Z0-9._ ]+/g, '').toLowerCase()
            };
        })
    );
    pages = pages.filter((item: pageType) => !item.frontMatter.page);
    pages.sort(compareDate);
    return pages;
};