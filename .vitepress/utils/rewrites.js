import fs from 'node:fs'
import path from 'node:path'

/**
 * 更加通用的自动化生成 rewrites 配置
 * 逻辑：
 * 1. 扫描所有文件夹下的 index.md，如果其中有 slug 属性，则该文件夹在 URL 中使用该 slug
 * 2. 扫描所有文件，如果文件有 slug，则文件名使用 slug
 * 
 * @param {string} resolvedSrcDir - 源文件目录的绝对路径
 * @returns {Object} rewrites 配置对象，键为源路径，值为目标路径
 */
export function getAutoRewrites(resolvedSrcDir) {
    const rewrites = {};
    const folderSlugMap = {}; // 存储 文件夹路径 -> 英文名 的映射

    if (!fs.existsSync(resolvedSrcDir)) return rewrites;

    // 第一遍扫描：建立文件夹映射
    function scanFolders(currentDir) {
        const files = fs.readdirSync(path.join(resolvedSrcDir, currentDir));
        const indexFile = files.find(f => f === 'index.md');
        
        if (indexFile) {
            const content = fs.readFileSync(path.join(resolvedSrcDir, currentDir, indexFile), 'utf-8');
            const slugMatch = content.match(/^slug:\s*([a-z0-9-]+)/m);
            if (slugMatch) {
                folderSlugMap[currentDir] = slugMatch[1];
            }
        }

        for (const file of files) {
            const fullPath = path.join(resolvedSrcDir, currentDir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                scanFolders(path.join(currentDir, file));
            }
        }
    }

    // 第二遍扫描：生成最终 rewrite 规则
    function generate(currentDir) {
        const files = fs.readdirSync(path.join(resolvedSrcDir, currentDir));
        
        for (const file of files) {
            const relativePath = path.join(currentDir, file);
            const fullPath = path.join(resolvedSrcDir, relativePath);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                generate(relativePath);
            } else if (file.endsWith('.md')) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                const slugMatch = content.match(/^slug:\s*([a-z0-9-]+)/m);
                
                // 计算每一级目录的重写名
                const segments = relativePath.split(path.sep);
                const newSegments = segments.map((segment, index) => {
                    const isLast = index === segments.length - 1;
                    
                    if (isLast) {
                        // 【修复逻辑】如果是 index.md，始终保持文件名不变
                        // 目录名由上一层级处理，不需要重写文件名
                        if (segment === 'index.md') return segment;
                        
                        // 普通文章：有 slug 用 slug，否则原样
                        return (slugMatch && slugMatch[1]) ? `${slugMatch[1]}.md` : segment;
                    } else {
                        // 目录名逻辑：查表，看该目录的 index.md 有没有定义 slug
                        const currentPathUpToThisDir = segments.slice(0, index + 1).join(path.sep);
                        return folderSlugMap[currentPathUpToThisDir] || segment;
                    }
                });

                const source = relativePath.replace(/\\/g, '/');
                const destination = newSegments.join('/').replace(/\\/g, '/');

                if (source !== destination) {
                    rewrites[source] = destination;
                }
            }
        }
    }

    scanFolders('');
    generate('');
    return rewrites;
}

