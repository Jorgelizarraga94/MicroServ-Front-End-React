# 💻 Frontend - E-commerce Microserv (React)

Interfaz de usuario desarrollada para la tienda online, conectada a la arquitectura de microservicios backend.

## 🌐 Acceso y Despliegue
* **Producción:** El proyecto se encuentra accesible en https://micro-serv-front-end-react.vercel.app.

---

## 🚀 Tecnologías y Librerías Utilizadas

* **React**
* **Vite** (Herramienta de empaquetado y desarrollo rápido)
* **Bootstrap** (Framework CSS para el diseño responsivo y componentes visuales)
* **Axios** (Cliente HTTP centralizado, configurado para saltar las advertencias de redirección de Ngrok mediante el header `ngrok-skip-browser-warning`).
* **Auth0 React SDK** (Autenticación y gestión de sesiones de usuario)
* **Vercel** (Plataforma de despliegue en producción)

---

## 🛠️ Funcionalidades Destacadas

* **Panel de Administración (`ControlPanel.jsx`):** Sección exclusiva para usuarios administradores que permite cargar nuevos productos y eliminarlos de forma dinámica.
  * **Credenciales de Acceso Administrador (Demo):**
    * **Usuario:** `admin@gmail.com`
    * **Contraseña:** `admin1234@`
* **Optimización de Imágenes:** Integración con **Cloudinary** para almacenar y optimizar recursos visuales, consumiendo las URLs provistas por el backend.

---

## 🚧 Próximas Mejoras y Pendientes

* **Barra de Búsqueda:** Finalizar la implementación de la barra de búsqueda en tiempo real para el catálogo.
* **Filtrado por Categoría:** Adaptar tanto el backend como el frontend para incorporar un nuevo campo de **Categoría** en los productos y permitir su filtrado dinámico.

---

## 🤖 Nota sobre el Desarrollo

Dado que el desarrollo frontend no es mi fuerte principal, este apartado fue construido con el valioso soporte y guía de **Inteligencia Artificial** como herramienta de asistencia técnica para estructurar componentes, integrar Bootstrap, configurar Auth0, armar el panel de control y resolver los desafíos de comunicación y CORS con el backend.

---

## 📂 Estructura del Proyecto

* `src/api/`: Configuración centralizada de Axios (`apiclient.js`) para la conexión con el API Gateway vía Ngrok.
* `src/components/`: Componentes visuales reutilizables (barras de navegación, tarjetas, carrusel, etc.).
* `src/pages/`: Vistas principales de la aplicación, incluyendo el catálogo, el carrito y el panel de control (`ControlPanel.jsx`).

---
