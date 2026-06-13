const fs = require('fs');
const path = require('path');
const docx = require(path.join(process.env.TEMP, 'docx_builder', 'node_modules', 'docx'));
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = docx;

function b(text, opts = {}) { return new TextRun({ text, color: "000000", ...opts }); }
function n(text, opts = {}) { return new TextRun({ text, bold: true, color: "000000", ...opts }); }

function p(text) { return new Paragraph({ children: [b(text)], spacing: { after: 80 } }); }
function t(text) { return new Paragraph({ children: [n(text, { size: 22 })], heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 150 } }); }
function st(text) { return new Paragraph({ children: [n(text, { size: 18 })], heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 100 } }); }

function cell(text, bold = false) {
  return new TableCell({
    children: [new Paragraph({ children: [bold ? n(text, { size: 10 }) : b(text, { size: 10 })], spacing: { after: 0 } })],
    borders: { top: { style: BorderStyle.SINGLE, size: 1 }, bottom: { style: BorderStyle.SINGLE, size: 1 }, left: { style: BorderStyle.SINGLE, size: 1 }, right: { style: BorderStyle.SINGLE, size: 1 } }
  });
}

async function main() {
  const ch = [];

  ch.push(new Paragraph({ children: [n("GUÍA RÁPIDA PARA LA DEFENSA", { size: 28 })], alignment: AlignmentType.CENTER, spacing: { after: 100 } }));
  ch.push(new Paragraph({ children: [n("AnaVictoria — Evaluación de Prototipo", { size: 20 })], alignment: AlignmentType.CENTER, spacing: { after: 300 } }));

  // DATOS
  ch.push(st("Datos del Proyecto"));
  const rows = [
    ["App", "AnaVictoria — Tienda de flores online"],
    ["Stack", "React 18 + TypeScript + Vite + Tailwind CSS + Supabase"],
    ["GitHub", "github.com/joansantacruz05/RDA1Floristeria"],
    ["GitHub Pages", "joansantacruz05.github.io/RDA1Floristeria"],
    ["Vercel", "floristeriaanavictoria.vercel.app"],
  ];
  ch.push(new Table({
    rows: rows.map(r => new TableRow({ children: [cell(r[0], true), cell(r[1])] })),
    width: { size: 100, type: WidthType.PERCENTAGE }
  }));

  // PUNTOS CRITICOS
  ch.push(t("8 Puntos Críticos"));

  const pcData = [
    ["Imágenes pesadas", "30 MB, PNG sin comprimir"],
    ["47 Radix sin usar", "Componentes instalados, nadie los importa"],
    ["Material UI sin usar", "6.5 MB al pedo"],
    ["Sin lazy loading", "Carga todo de golpe"],
    ["Sin paginación", "49 productos en una pantalla"],
    ["Datos en localStorage", "Contraseñas en texto plano"],
    ["Sin Service Worker", "No funciona offline"],
    ["Motion.js innecesario", "Se puede hacer con CSS"],
  ];
  ch.push(new Table({
    rows: pcData.map(r => new TableRow({ children: [cell(r[0], true), cell(r[1])] })),
    width: { size: 100, type: WidthType.PERCENTAGE }
  }));

  // SOLUCIONES
  ch.push(t("7 Soluciones"));
  const poData = [
    ["WebP", "30 MB → 4-6 MB"],
    ["Borrar dependencias muertas", "npm ci: 60s → 25s"],
    ["Lazy loading", "Bundle 200 KB → 35 KB"],
    ["Paginación", "8 productos por vez"],
    ["CSS en vez de Motion", "-30 KB, misma animación"],
    ["Service Worker", "Offline + carga instantánea"],
    ["Supabase sin fallback", "No más contraseñas en texto plano"],
  ];
  ch.push(new Table({
    rows: poData.map(r => new TableRow({ children: [cell(r[0], true), cell(r[1])] })),
    width: { size: 100, type: WidthType.PERCENTAGE }
  }));

  // COMANDOS
  ch.push(t("Comandos para mostrar en vivo"));
  ch.push(p("1. Peso total de imágenes:"));
  ch.push(new Paragraph({ children: [b('  Get-ChildItem src/assets -Recurse -Include *.png,*.jpg,*.jpeg | Measure-Object -Property Length -Sum', { size: 10 })] }));
  ch.push(p("2. Componentes sin usar:"));
  ch.push(new Paragraph({ children: [b('  Get-ChildItem src/app/components/ui -Name', { size: 10 })] }));
  ch.push(p("3. Peso del build:"));
  ch.push(new Paragraph({ children: [b('  npm run build', { size: 10 })] }));
  ch.push(new Paragraph({ children: [b('  Get-ChildItem dist -Recurse | Measure-Object -Property Length -Sum', { size: 10 })] }));

  // 5 CONCLUSIONES
  ch.push(t("5 Conclusiones"));
  const conclusions = [
    "Imágenes: cuello de botella. Con WebP se pasa de 12s a 2.5s de carga.",
    "90% de dependencias no se usan. Radix y MUI sobran.",
    "Lazy loading reduce el JS inicial en 65%.",
    "Paginación necesaria para que no se congele el celular.",
    "30 MB actual → 2 MB final con las optimizaciones."
  ];
  conclusions.forEach((text, i) => {
    ch.push(new Paragraph({ children: [n(`${i + 1}. `), b(text)], spacing: { before: 100, after: 100 } }));
  });

  // FRASES
  ch.push(t("Frases clave para la defensa"));
  ch.push(p('• "Analicé la página con el inspector de Chrome y PowerShell"'));
  ch.push(p('• "Las imágenes sin comprimir son el problema más grave"'));
  ch.push(p('• "En Ecuador la mayoría usa internet móvil, 30 MB no es viable"'));
  ch.push(p('• "GitHub Pages y Vercel tienen configuraciones distintas de base path"'));
  ch.push(p('• "El informe está en Word con todas las capturas de pantalla"'));

  // QUE MOSTRAR
  ch.push(t("Qué mostrar en pantalla"));
  ch.push(p("1. El Word (INFORME_EVALUACION_ANAVICTORIA.docx)"));
  ch.push(p("2. La página en Vercel (floristeriaanavictoria.vercel.app)"));
  ch.push(p("3. F12 → Red → Recargar (mostrar los MB que carga)"));
  ch.push(p("4. Terminal con los comandos"));

  const buf = await Packer.toBuffer(new Document({ sections: [{ properties: {}, children: ch }] }));
  const desk = 'C:\\Users\\Redbl\\OneDrive\\Desktop';
  const docxPath = path.join(desk, 'GUIA_DEFENSA.docx');
  fs.writeFileSync(docxPath, buf);
  console.log('DOCX creado:', docxPath);

  // Convert to PDF using Word COM
  const { execSync } = require('child_process');
  try {
    execSync(`powershell -Command "$word = New-Object -ComObject Word.Application; $word.Visible = $false; $doc = $word.Documents.Open('${docxPath}'); $pdfPath = '${desk}\\GUIA_DEFENSA.pdf'; $doc.SaveAs2([ref] $pdfPath, [ref] 17); $doc.Close(); $word.Quit()"`, { timeout: 30000, stdio: 'pipe' });
    console.log('PDF creado:', path.join(desk, 'GUIA_DEFENSA.pdf'));
  } catch (e) {
    console.log('No se pudo convertir a PDF automáticamente. El DOCX está listo.');
    console.log('Abrilo en Word y guardá como PDF.');
  }
}
main().catch(console.error);
