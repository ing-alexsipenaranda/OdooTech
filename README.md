📌 **Backend OdooTech**

Este proyecto es el backend de OdooTech, encargado de gestionar la integración entre Odoo y sistemas externos. Provee autenticación, endpoints REST y lógica de negocio personalizada.

## 🚀 **Tecnologías utilizadas**

Node.js (v23)
Express.js
JWT para autenticación
Docker & Docker Compose
PostgreSQL (para DB propia)
Odoo API (integración vía RPC/JSON)

## **⚙️ Instalación y configuración**

**Clonar el repositorio**
```bash
git clone git@github.com:ing-alexsipenaranda/OdooTech.git
cd backend-odoo
```

**Configurar variables de entorno**
Copiar el archivo .env.example a .env y completar con tus valores:
```bash
PORT=4000
DB_HOST=localhost
DB_USER=postgres
DB_PASS=secret
DB_NAME=odoo_tech
JWT_SECRET=supersecret
ODOO_URL=http://odoo:8069
ODOO_DB=odoo_db
ODOO_USER=admin
ODOO_PASS=admin

```
**Instalar dependencias**
```bash
npm install
```
**Levantar en desarrollo**
```bash
npm run dev
```
**Levantar con Docker**
```bash
docker-compose up --build
```
## **🔑 Autenticación**

El sistema usa JWT.
Ejemplo de login:

POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "1234"
}

## **📡 Endpoints principales**
**🔐 Autenticación**
POST /api/auth/login → Genera un token JWT.

**👤 Usuarios**
GET /api/users → Lista de usuarios de Odoo.
POST /api/users → Crear usuario en Odoo.

**📦 Productos**
GET /api/products → Lista de productos desde Odoo.
POST /api/products → Crear producto.

**(los endpoints se pueden expandir según lo que vayamos agregando)**

## **🛠️ Scripts útiles**
```bash
npm run dev       # Desarrollo con nodemon
npm run start     # Producción
npm run lint      # Analizar estilo del código
```


