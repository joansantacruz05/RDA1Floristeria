# GUÍA RÁPIDA PARA LA DEFENSA — ANAVICTORIA

---

## DATOS DEL PROYECTO

| | |
|---|---|
| App | AnaVictoria — Tienda de flores online |
| Stack | React 18 + TypeScript + Vite + Tailwind CSS + Supabase |
| GitHub | github.com/joansantacruz05/RDA1Floristeria |
| GitHub Pages | joansantacruz05.github.io/RDA1Floristeria |
| Vercel | floristeriaanavictoria.vercel.app |

---

## 8 PUNTOS CRÍTICOS (decí 2 o 3 palabras cada uno)

1. **Imágenes pesadas** — 30 MB, PNG sin comprimir
2. **47 Radix sin usar** — componentes instalados, nadie los importa
3. **Material UI sin usar** — 6.5 MB al pedo
4. **Sin lazy loading** — carga todo de golpe
5. **Sin paginación** — 49 productos en una pantalla
6. **Datos en localStorage** — contraseñas en texto plano
7. **Sin Service Worker** — no funciona offline
8. **Motion.js innecesario** — animaciones se pueden hacer con CSS

---

## 7 SOLUCIONES (frase corta cada una)

| Propuesta | Resultado |
|---|---|
| WebP | 30 MB → 4-6 MB |
| Borrar dependencias muertas | npm ci: 60s → 25s |
| Lazy loading | Bundle inicial 200 KB → 35 KB |
| Paginación | 8 productos por vez |
| CSS en vez de Motion | -30 KB, misma animación |
| Service Worker | offline + carga instantánea |
| Supabase sin fallback | no más contraseñas en texto plano |

---

## 3 COMANDOS PARA MOSTRAR EN VIVO

```powershell
# 1 - Peso total de imágenes
Get-ChildItem src/assets -Recurse -Include *.png,*.jpg,*.jpeg | Measure-Object -Property Length -Sum

# 2 - Componentes sin usar (abre la carpeta)
Get-ChildItem src/app/components/ui -Name

# 3 - Peso del build
npm run build
Get-ChildItem dist -Recurse | Measure-Object -Property Length -Sum
```

---

## 5 CONCLUSIONES (memorizalas)

1. **Imágenes** son el cuello de botella. Con WebP se pasa de 12s a 2.5s de carga.
2. **90% de dependencias no se usan.** Radix y MUI sobran.
3. **Lazy loading** reduce el JS inicial en 65%.
4. **Paginación** necesaria para que no se congele el celular.
5. **30 MB actual → 2 MB final** con las optimizaciones.

---

## FRASES CLAVE PARA LA DEFENSA

- "Analicé la página con el inspector de Chrome y PowerShell"
- "Las imágenes sin comprimir son el problema más grave"
- "En Ecuador la mayoría usa internet móvil, 30 MB no es viable"
- "GitHub Pages usa subdirectorio, Vercel usa raíz, por eso tocamos el base path"
- "El informe está en Word con todas las capturas de pantalla"

---

## LO QUE PODÉS MOSTRAR EN PANTALLA

1. ✅ El Word en el escritorio (`INFORME_EVALUACION_ANAVICTORIA.docx`)
2. ✅ La página en Vercel (`floristeriaanavictoria.vercel.app`)
3. ✅ F12 → Red → recargar (mostrar los MB que carga)
4. ✅ Terminal con los comandos de arriba
