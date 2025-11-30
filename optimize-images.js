/**
 * Script para optimizar todas las imágenes del proyecto
 * Convierte JPG/PNG a WebP (70% más livianas)
 * 
 * INSTALACIÓN:
 * npm install sharp --save-dev
 * 
 * USO:
 * node optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuración
const CONFIG = {
  inputDir: './public/img',
  outputDir: './public/img/optimized',
  formats: ['.jpg', '.jpeg', '.png'],
  webpQuality: 80,
  jpegQuality: 75,
  createBackup: true,
};

// Crear directorio de salida
if (!fs.existsSync(CONFIG.outputDir)) {
  fs.mkdirSync(CONFIG.outputDir, { recursive: true });
}

// Función para obtener todos los archivos recursivamente
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (CONFIG.formats.includes(ext)) {
        arrayOfFiles.push(filePath);
      }
    }
  });

  return arrayOfFiles;
}

// Función para optimizar una imagen
async function optimizeImage(inputPath) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const relativePath = path.relative(CONFIG.inputDir, path.dirname(inputPath));
  const outputDir = path.join(CONFIG.outputDir, relativePath);
  
  // Crear directorio si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const webpPath = path.join(outputDir, `${filename}.webp`);
  const jpegPath = path.join(outputDir, `${filename}.jpg`);

  try {
    const originalSize = fs.statSync(inputPath).size;

    // Convertir a WebP (mejor compresión)
    await sharp(inputPath)
      .webp({ quality: CONFIG.webpQuality })
      .toFile(webpPath);

    const webpSize = fs.statSync(webpPath).size;

    // También crear versión JPEG optimizada (fallback)
    await sharp(inputPath)
      .jpeg({ quality: CONFIG.jpegQuality, mozjpeg: true })
      .toFile(jpegPath);

    const jpegSize = fs.statSync(jpegPath).size;

    // Calcular ahorros
    const webpSavings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    const jpegSavings = ((originalSize - jpegSize) / originalSize * 100).toFixed(1);

    console.log(`✅ ${path.basename(inputPath)}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB`);
    console.log(`   WebP: ${(webpSize / 1024).toFixed(1)} KB (${webpSavings}% ahorro)`);
    console.log(`   JPEG: ${(jpegSize / 1024).toFixed(1)} KB (${jpegSavings}% ahorro)\n`);

    return {
      original: originalSize,
      webp: webpSize,
      jpeg: jpegSize,
    };
  } catch (error) {
    console.error(`❌ Error optimizando ${inputPath}:`, error.message);
    return null;
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando optimización de imágenes...\n');
  console.log(`📁 Directorio: ${CONFIG.inputDir}`);
  console.log(`💾 Salida: ${CONFIG.outputDir}\n`);

  const images = getAllFiles(CONFIG.inputDir);
  
  if (images.length === 0) {
    console.log('❌ No se encontraron imágenes para optimizar');
    return;
  }

  console.log(`📸 Se encontraron ${images.length} imágenes\n`);

  let totalOriginal = 0;
  let totalWebP = 0;
  let totalJPEG = 0;
  let optimized = 0;

  for (const image of images) {
    const result = await optimizeImage(image);
    
    if (result) {
      totalOriginal += result.original;
      totalWebP += result.webp;
      totalJPEG += result.jpeg;
      optimized++;
    }
  }

  // Resumen
  console.log('\n📊 RESUMEN DE OPTIMIZACIÓN');
  console.log('═══════════════════════════════════');
  console.log(`Imágenes procesadas: ${optimized}/${images.length}`);
  console.log(`\nTamaño original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Tamaño WebP: ${(totalWebP / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Tamaño JPEG: ${(totalJPEG / 1024 / 1024).toFixed(2)} MB`);
  
  const webpSavings = ((totalOriginal - totalWebP) / totalOriginal * 100).toFixed(1);
  const jpegSavings = ((totalOriginal - totalJPEG) / totalOriginal * 100).toFixed(1);
  
  console.log(`\n💰 Ahorro con WebP: ${webpSavings}%`);
  console.log(`💰 Ahorro con JPEG: ${jpegSavings}%`);
  console.log('\n✨ ¡Optimización completada!');
  
  console.log('\n📝 PRÓXIMOS PASOS:');
  console.log('1. Reemplaza las imágenes en /public/img con las de /public/img/optimized');
  console.log('2. Asegúrate de que Next.js Image esté configurado para WebP');
  console.log('3. Considera usar <picture> para fallback a JPEG');
}

// Ejecutar
main().catch(console.error);

/**
 * INSTRUCCIONES DE USO:
 * 
 * 1. Instalar sharp:
 *    npm install sharp --save-dev
 * 
 * 2. Ejecutar script:
 *    node optimize-images.js
 * 
 * 3. Las imágenes optimizadas estarán en /public/img/optimized
 * 
 * 4. Reemplazar imágenes originales (hacer backup antes):
 *    - Opción A: Mover manualmente
 *    - Opción B: Modificar CONFIG.outputDir para sobrescribir
 * 
 * 5. Next.js Image automáticamente servirá WebP si el navegador lo soporta
 */