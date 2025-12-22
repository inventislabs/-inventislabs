const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'src', 'assets', 'in.svg');
const outputPath = path.join(__dirname, 'src', 'components', 'IndiaMapData.js');

try {
    const svgContent = fs.readFileSync(svgPath, 'utf8');

    // Regex to find path elements with id, name, and d attributes
    // <path d="..." id="..." name="...">
    const pathRegex = /<path\s+d="([^"]+)"\s+id="([^"]+)"\s+name="([^"]+)">/g;

    let match;
    const paths = [];

    while ((match = pathRegex.exec(svgContent)) !== null) {
        const d = match[1];
        const id = match[2];
        const name = match[3];

        // Calculate approximating bounding box
        const coordinates = d.match(/-?[\d.]+/g).map(Number);
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        for (let i = 0; i < coordinates.length; i += 2) {
            const x = coordinates[i];
            const y = coordinates[i + 1];
            if (!isNaN(x)) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
            }
            if (!isNaN(y)) {
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }

        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        paths.push({
            id,
            name,
            d,
            centerX: Math.round(centerX),
            centerY: Math.round(centerY)
        });
    }

    const fileContent = `export const indiaMapPaths = ${JSON.stringify(paths, null, 4)};`;

    fs.writeFileSync(outputPath, fileContent);
    console.log(`Successfully extracted ${paths.length} paths to ${outputPath}`);

    // Log centroids for key states to help with hotspot positioning
    const keyStates = ['INDL', 'INGJ', 'INMH', 'INAS', 'INMP'];
    const centroids = paths.filter(p => keyStates.includes(p.id)).map(p => ({ id: p.id, x: p.centerX, y: p.centerY }));
    console.log('Key Centroids:', JSON.stringify(centroids));

} catch (err) {
    console.error('Error processing SVG:', err);
}
