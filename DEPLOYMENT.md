# Guía de Despliegue en Vercel

## El Problema que Tenías

El error **"The page could not be found NOT_FOUND"** ocurría porque:

1. **Vercel es un hosting estático** - No ejecuta servidores Express automáticamente
2. Tu backend Express en `backend/server.js` **no se ejecutaba** en Vercel
3. Cuando el formulario intentaba hacer POST a `/api/mensajes`, Vercel devolvía 404

## La Solución

Hemos convertido tu backend a **Vercel Serverless Functions**:

- ✅ Creado `/api/mensajes.js` - Función serverless que reemplaza las rutas Express
- ✅ Actualizado `vercel.json` - Configuración para enrutar `/api/*` a las funciones
- ✅ El frontend (`form.js`) ya funciona correctamente con esta arquitectura

## Pasos para Desplegar

### 1. Configurar Variables de Entorno en Vercel

Ve a tu proyecto en Vercel Dashboard y añade estas variables de entorno:

```
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

**Cómo hacerlo:**

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Añade las dos variables arriba con tus valores reales de Supabase

### 2. Desplegar

Opción A - **Desde Git (Recomendado)**:

```bash
git add .
git commit -m "Migrar a Vercel Serverless Functions"
git push
```

Vercel detectará automáticamente los cambios y desplegará.

Opción B - **Desde CLI**:

```bash
npm install -g vercel
vercel --prod
```

### 3. Verificar

Después del despliegue, prueba:

1. **Health check**: `https://tu-dominio.vercel.app/api/mensajes` (GET)
2. **Formulario**: Envía un mensaje desde tu sitio web

## Estructura del Proyecto Ahora

```
Portafolio/
├── api/
│   └── mensajes.js          ← Función serverless (reemplaza Express)
├── backend/
│   ├── server.js            ← Solo para desarrollo local
│   └── form.js              ← Lógica del formulario (frontend)
├── index.html               ← Tu página principal
├── vercel.json              ← Configuración de Vercel
└── package.json
```

## Desarrollo Local

Para desarrollo local, sigue usando tu servidor Express:

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend (si usas Tailwind)
npm run dev
```

El servidor local seguirá funcionando en `http://localhost:3000`

## Diferencias Clave

| Aspecto   | Desarrollo Local                     | Producción (Vercel)                          |
| --------- | ------------------------------------ | -------------------------------------------- |
| Backend   | Express Server (`backend/server.js`) | Serverless Function (`api/mensajes.js`)      |
| URL API   | `http://localhost:3000/api/mensajes` | `https://tu-dominio.vercel.app/api/mensajes` |
| Ejecución | Servidor siempre corriendo           | Función se ejecuta bajo demanda              |

## Solución de Problemas

### Error 500 en Vercel

- Verifica que las variables de entorno estén configuradas correctamente
- Revisa los logs en Vercel Dashboard → Functions

### Error CORS

- Ya está configurado en `api/mensajes.js` con `Access-Control-Allow-Origin: *`

### El formulario no envía

- Abre la consola del navegador (F12) para ver errores
- Verifica que la URL de la API sea correcta

## Alternativas (Si Prefieres Otro Enfoque)

### Opción 2: Usar Railway/Render para el Backend

Si prefieres mantener Express:

1. Despliega el backend en Railway o Render
2. Actualiza `form.js` para apuntar a esa URL
3. Despliega solo el frontend en Vercel

### Opción 3: Todo en un Solo Servicio

Despliega todo (frontend + backend) en:

- Railway
- Render
- Heroku
- DigitalOcean App Platform

## Recursos

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
