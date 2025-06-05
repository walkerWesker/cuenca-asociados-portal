<div align="center">
  <h1>Cuenca & Asociados</h1>
  <p><strong>Auditoría Financiera, Contable y Tributaria</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react" alt="React">
    <img src="https://img.shields.io/badge/Vite-6.3.0-ffcc00?style=for-the-badge&logo=vite" alt="Vite">
    <img src="https://img.shields.io/badge/TailwindCSS-4.1.0-06B6D4?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Framer_Motion-4.1.17-blueviolet?style=for-the-badge&logo=framer" alt="Framer Motion">
  </p>
</div>

---

## Descripción

**Cuenca & Asociados** es una aplicación web profesional diseñada en **React**, que ofrece soluciones integrales de auditoría financiera, contable y tributaria. Con un enfoque en la interactividad, las transiciones suaves y un diseño responsivo, la plataforma está pensada para brindar una experiencia moderna y humana a cada usuario. El objetivo de este proyecto es combinar la excelencia técnica con un diseño intuitivo, facilitando la navegación y la comunicación entre la firma y sus clientes.

---

## Características Destacadas

- **Animaciones y Transiciones Modernas:**  
  Con **Framer Motion** y **AOS**, cada interacción se convierte en una experiencia visual envolvente. Las animaciones están cuidadosamente diseñadas para crear una sensación de fluidez y dinamismo.
  
  ![Animación de Transiciones](https://media.giphy.com/media/l0HlQ7LRalSxOO2gU/giphy.gif)

- **Diseño Responsivo y Modular:**  
  Utilizando **Tailwind CSS**, la aplicación se adapta perfectamente a todo tipo de dispositivos, ofreciendo una interfaz limpia y moderna en móviles, tablets y escritorio.

- **Navegación Intuitiva:**  
  Un **Header** fijo y dinámico permite acceder fácilmente a las secciones más importantes (Inicio, Servicios, Nosotros y Contacto). El menú se adapta según el dispositivo para garantizar una experiencia de usuario fluida.

- **Presentación Visual de Servicios:**  
  Los servicios se gestionan de forma dinámica mediante un archivo de datos centralizado, permitiendo actualizaciones sencillas. Cada servicio se presenta con animaciones y un diseño que resalta su valor y profesionalismo.

- **Experiencia Inmersiva en Detalle:**  
  Las páginas de detalle de servicios (ServiceDetail) muestran información completa, enriquecida con imágenes de alta calidad, transiciones suaves y secciones interactivas que destacan las ventajas competitivas de la firma.

---

## 🧩 Estructura del Proyecto

```bash
src/
├── components/
│   ├── ui/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ServiceDetail.tsx
│   ├── Services.tsx
│   └── ServicesSlider.tsx
├── data/
│   └── services.ts
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   └── use-tv-detection.tsx
├── lib/
│   └── utils.ts
├── pages/
│   ├── Index.tsx
│   ├── NotFound.tsx
│   └── ServicePage.tsx
├── App.css
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

---

## ✨ Características

- 🎨 Diseño moderno y adaptable (responsive) con **Tailwind CSS 4.1**
- ⚡ Animaciones fluidas con **GSAP** y transiciones suaves con **Framer Motion**
- 🔌 Componentes reutilizables y estructura modular
- 🧠 Hooks personalizados para mejor control del comportamiento
- 📱 Detección de dispositivos móviles y TVs
- 📈 Navegación intuitiva y tiempos de carga optimizados

---

## 🛠️ Tecnologías Utilizadas

---

## ⚙️ Personalización Rápida

- Modifica el contenido de los servicios en `src/data/services.ts`
- Agrega secciones nuevas editando o creando archivos en `src/components/`
- Controla la navegación desde `src/pages/`
- Anima cualquier elemento fácilmente con **GSAP** y **Framer Motion**

---



## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
