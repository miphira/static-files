const fs = require('fs');
const path = require('path');

// Các thư mục/file cần bỏ qua
const IGNORE_LIST = [
    'node_modules',
    '.git',
    '.vscode',
    'package-lock.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    '.DS_Store',
    'Thumbs.db',
    'scripts'
];

function generateTree(dir, prefix = '', isRoot = true) {
    const items = fs.readdirSync(dir)
        .filter(item => !IGNORE_LIST.includes(item))
        .sort((a, b) => {
            const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
            const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
            
            // Thư mục trước, file sau
            if (aIsDir && !bIsDir) return -1;
            if (!aIsDir && bIsDir) return 1;
            return a.localeCompare(b);
        });

    let tree = '';
    
    items.forEach((item, index) => {
        const itemPath = path.join(dir, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();
        const isLast = index === items.length - 1;
        
        if (isRoot && index === 0) {
            tree += `${item}${isDirectory ? '/\n' : '\n'}`;
        } else {
            const connector = isLast ? '└── ' : '├── ';
            tree += `${prefix}${connector}${item}${isDirectory ? '/\n' : '\n'}`;
        }
        
        if (isDirectory) {
            const newPrefix = isRoot && index === 0 ? '' : prefix + (isLast ? '    ' : '│   ');
            tree += generateTree(itemPath, newPrefix, false);
        }
    });
    
    return tree;
}

function updateReadme() {
    const readmePath = path.join(__dirname, '..', 'README.md');
    const rootDir = path.join(__dirname, '..');
    
    let readmeContent = '';
    if (fs.existsSync(readmePath)) {
        readmeContent = fs.readFileSync(readmePath, 'utf8');
    }
    
    const treeMap = generateTree(rootDir);
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Tìm và thay thế phần tree structure cũ hoặc thêm mới
    const treeSection = `\n## 📁 Project Structure\n\n*Last updated: ${currentDate}*\n\n\`\`\`\n${treeMap.trim()}\n\`\`\`\n`;
    
    const treeRegex = /\n## 📁 Project Structure[\s\S]*?```\n[\s\S]*?\n```\n/;
    
    if (treeRegex.test(readmeContent)) {
        readmeContent = readmeContent.replace(treeRegex, treeSection);
    } else {
        // Nếu không tìm thấy section cũ, thêm vào cuối file
        readmeContent += treeSection;
    }
    
    fs.writeFileSync(readmePath, readmeContent);
    console.log('✅ Tree map đã được cập nhật trong README.md');
    console.log(`📊 Tổng số files/folders: ${treeMap.split('\n').filter(line => line.trim()).length}`);
}

// Chạy script
try {
    updateReadme();
} catch (error) {
    console.error('❌ Lỗi khi tạo tree map:', error.message);
    process.exit(1);
}