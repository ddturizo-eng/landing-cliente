/**
 * Script para verificar qué imágenes existen y cuáles faltan
 * USO: node check-images.js
 */

const fs = require('fs');
const path = require('path');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

console.log(`\n${colors.cyan}🔍 Verificando imágenes del proyecto HC Efectos...${colors.reset}\n`);

// Imágenes requeridas según los componentes
const requiredImages = {
  'AboutSection': [
    '/img/team.jpg',
  ],
  'EventTypesSection': [
    '/img/Heroback.jpg',
    '/img/eventos/xv.jpg',
    '/img/eventos/revelacion.jpg',
    '/img/eventos/corporativo.jpg',
    '/img/eventos/institucional.jpg',
    '/img/eventos/personalizado.jpg',
  ],
  'EventosDestacados': [
    '/img/eventos/bodatop.jpg',
    '/img/eventos/XV.png',
    '/img/eventos/conciert.png',
    '/img/eventos/Humorosa.jpg',
    '/img/eventos/lajuma.png',
    '/img/eventos/INa-1.png',
  ],
};

// Función para verificar si un archivo existe
function checkFile(filePath) {
  const fullPath = path.join(process.cwd(), 'public', filePath);
  return fs.existsSync(fullPath);
}

// Función para obtener el tamaño del archivo
function getFileSize(filePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    const stats = fs.statSync(fullPath);
    return (stats.size / 1024).toFixed(2) + ' KB';
  } catch (error) {
    return 'N/A';
  }
}

// Verificar cada sección
let totalImages = 0;
let existingImages = 0;
let missingImages = 0;

Object.entries(requiredImages).forEach(([section, images]) => {
  console.log(`${colors.blue}📁 ${section}${colors.reset}`);
  console.log('─'.repeat(60));
  
  images.forEach((imagePath) => {
    totalImages++;
    const exists = checkFile(imagePath);
    
    if (exists) {
      existingImages++;
      const size = getFileSize(imagePath);
      console.log(`  ${colors.green}✓${colors.reset} ${imagePath} (${size})`);
    } else {
      missingImages++;
      console.log(`  ${colors.red}✗${colors.reset} ${imagePath} ${colors.red}(FALTA)${colors.reset}`);
    }
  });
  
  console.log('');
});

// Resumen
console.log('═'.repeat(60));
console.log(`${colors.cyan}📊 RESUMEN${colors.reset}`);
console.log('═'.repeat(60));
console.log(`Total de imágenes: ${totalImages}`);
console.log(`${colors.green}Encontradas: ${existingImages}${colors.reset}`);
console.log(`${colors.red}Faltantes: ${missingImages}${colors.reset}`);

if (missingImages > 0) {
  console.log(`\n${colors.yellow}⚠️  ACCIONES REQUERIDAS:${colors.reset}`);
  console.log('1. Verifica que las imágenes existan en las rutas correctas');
  console.log('2. Renombra los archivos si tienen nombres diferentes');
  console.log('3. Mueve las imágenes a las carpetas correctas');
  console.log('4. Asegúrate de que las extensiones sean correctas (.jpg, .png, etc.)');
  
  // Mostrar estructura de carpetas esperada
  console.log(`\n${colors.cyan}📂 ESTRUCTURA ESPERADA:${colors.reset}`);
  console.log('public/');
  console.log('  └── img/');
  console.log('      ├── team.jpg');
  console.log('      ├── Heroback.jpg');
  console.log('      └── eventos/');
  console.log('          ├── xv.jpg');
  console.log('          ├── revelacion.jpg');
  console.log('          ├── corporativo.jpg');
  console.log('          ├── institucional.jpg');
  console.log('          ├── personalizado.jpg');
  console.log('          ├── bodatop.jpg');
  console.log('          ├── XV.png');
  console.log('          ├── conciert.png');
  console.log('          ├── Humorosa.jpg');
  console.log('          ├── lajuma.png');
  console.log('          └── INa-1.png');
} else {
  console.log(`\n${colors.green}✅ ¡Todas las imágenes están presentes!${colors.reset}`);
}

// Buscar archivos adicionales
console.log(`\n${colors.cyan}🔎 ARCHIVOS ADICIONALES EN /img:${colors.reset}`);
const imgDir = path.join(process.cwd(), 'public', 'img');
const eventosDir = path.join(imgDir, 'eventos');

try {
  // Listar archivos en /img
  const imgFiles = fs.readdirSync(imgDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
  });
  
  console.log(`\nArchivos en /img (${imgFiles.length}):`);
  imgFiles.forEach(file => {
    const size = getFileSize(`/img/${file}`);
    console.log(`  ${colors.cyan}•${colors.reset} ${file} (${size})`);
  });
  
  // Listar archivos en /img/eventos
  if (fs.existsSync(eventosDir)) {
    const eventosFiles = fs.readdirSync(eventosDir).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
    });
    
    console.log(`\nArchivos en /img/eventos (${eventosFiles.length}):`);
    eventosFiles.forEach(file => {
      const size = getFileSize(`/img/eventos/${file}`);
      console.log(`  ${colors.cyan}•${colors.reset} ${file} (${size})`);
    });
  }
} catch (error) {
  console.log(`${colors.red}Error al leer directorios: ${error.message}${colors.reset}`);
}

console.log('');

// Verificar configuración de Next.js
console.log(`${colors.cyan}⚙️  VERIFICACIÓN DE CONFIGURACIÓN:${colors.reset}`);
const nextConfigPath = path.join(process.cwd(), 'next.config.ts');
if (fs.existsSync(nextConfigPath)) {
  console.log(`${colors.green}✓${colors.reset} next.config.ts existe`);
} else {
  console.log(`${colors.red}✗${colors.reset} next.config.ts NO encontrado`);
}

console.log('\n' + '═'.repeat(60) + '\n');

process.exit(missingImages > 0 ? 1 : 0);