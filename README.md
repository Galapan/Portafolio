# 🚀 Aetherys Systems - Portafolio

Portafolio profesional de Aetherys Systems, una empresa de desarrollo de software que crea soluciones digitales modernas y elegantes.

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz con glassmorphism y gradientes personalizados
- ⚡ **Alto Rendimiento**: Optimizado con Tailwind CSS y código minificado
- 🌟 **Animaciones Fluidas**: Sistema de partículas interactivas y animaciones CSS
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- 🔍 **SEO Optimizado**: Meta tags completos para mejor posicionamiento
- 📧 **Formulario de Contacto**: Integrado con Supabase para almacenar mensajes

## 🛠️ Tecnologías Utilizadas

### Frontend

- HTML5
- CSS3 (Tailwind CSS v4.1.17)
- JavaScript (Vanilla)
- Font Awesome 6.4.0

### Backend

- Node.js
- Express.js
- Supabase (Base de datos)
- dotenv (Variables de entorno)

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Portafolio
```

### 2. Instalar dependencias del frontend

```bash
npm install
```

### 3. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 4. Configurar variables de entorno

Crear un archivo `.env` en la carpeta `backend/` con:

```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_KEY=tu_key_de_supabase
PORT=3000
```

## 🚀 Uso

### Modo Desarrollo

#### Compilar CSS en modo watch:

```bash
npm run dev
```

#### Iniciar el servidor backend:

```bash
npm run backend:dev
```

#### Vista previa del sitio:

```bash
npm run preview
```

### Modo Producción

#### Compilar CSS minificado:

```bash
npm run build
```

#### Iniciar servidor backend:

```bash
npm start
```

## 📁 Estructura del Proyecto

```
Portafolio/
├── backend/
│   ├── .env                    # Variables de entorno (no incluido en git)
│   ├── form.js                 # Lógica del formulario de contacto
│   ├── server.js               # Servidor Express
│   ├── supabaseClient.js       # Cliente de Supabase
│   └── package.json            # Dependencias del backend
├── src/
│   ├── input.css               # Estilos personalizados
│   ├── output.css              # CSS compilado por Tailwind
│   ├── scroll.js               # Animaciones de scroll
│   └── particles.js            # Sistema de partículas
├── index.html                  # Página principal
├── package.json                # Dependencias del frontend
├── tailwind.config.js          # Configuración de Tailwind
└── README.md                   # Este archivo
```

## 🎨 Características del Diseño

### Glassmorphism

Efectos de vidrio esmerilado en tarjetas y botones para un look moderno y elegante.

### Sistema de Partículas

Partículas animadas en el fondo que se conectan entre sí, creando un efecto visual dinámico.

### Animaciones

- Fade in/out
- Slide in (left/right)
- Hover effects
- Scroll-triggered animations

### Paleta de Colores

- **Principal**: Purple (#a855f7)
- **Fondo**: Gradiente oscuro (Purple → Dark → Blue)
- **Texto**: Blanco y grises

## 📱 Secciones

1. **Bienvenida**: Presentación de la empresa
2. **Proyectos**: Catálogo de proyectos desarrollados
3. **Servicios**: Servicios ofrecidos
4. **Nosotros**: Valores del equipo
5. **Contacto**: Formulario de contacto

## 🔧 Optimizaciones Implementadas

- ✅ CSS sin duplicados
- ✅ Tailwind configurado para purgar CSS no utilizado
- ✅ Scripts con atributo `defer` para carga asíncrona
- ✅ Throttling en scroll listeners para mejor performance
- ✅ Passive event listeners
- ✅ Meta tags SEO completos
- ✅ Sistema de partículas optimizado con requestAnimationFrame
- ✅ CORS configurado correctamente
- ✅ Validación de formularios

## 🌐 Despliegue

El proyecto está configurado para desplegarse en Vercel. El archivo `vercel.json` contiene la configuración necesaria.

### Variables de Entorno en Vercel

Asegúrate de configurar las siguientes variables:

- `SUPABASE_URL`
- `SUPABASE_KEY`

## 📄 Licencia

Este proyecto es propiedad de Aetherys Systems.

## 👥 Equipo

Desarrollado por el equipo de Aetherys Systems.

## 📞 Contacto

Para consultas o proyectos, visita nuestro sitio web o completa el formulario de contacto.

---

**Aetherys Systems** - Elevando ideas a realidad 🚀
