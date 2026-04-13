# Suscripciones API

API REST construida con **Express + TypeScript + TypeORM + MariaDB** para gestionar clientes, fondos de inversión, suscripciones y transacciones.

## Funcionalidades

### 1) Gestión de clientes
- `GET /clientes`: lista clientes con paginación.
  - Query params:
    - `asc=true|false` (orden por `id`)
    - `cant=<numero>` (cantidad por página)
    - `page=<numero>` (página)
- `GET /clientes/:id`: obtiene un cliente por ID.
- `POST /clientes`: crea un cliente.
  - El `saldo` inicial se asigna automáticamente en `500000`.

### 2) Catálogo de fondos
- `GET /fondos`: lista todos los fondos junto con su categoría.

### 3) Suscripciones a fondos
- `POST /suscripciones/suscribirse`:
  - Recibe `cliente.id` y `fondos.id`.
  - Descuenta `montoMin` del fondo sobre el saldo del cliente.
  - Crea el registro de relación cliente-fondo.
  - Registra una transacción (`tipo = true`).
  - Dispara notificaciones (correo y SMS) desde el backend.
- `POST /suscripciones/desuscribirse`:
  - Recibe `cliente.id` y `fondos.id`.
  - Suma `montoMin` del fondo al saldo del cliente.
  - Registra la operación y la transacción (`tipo = false`).
- `GET /suscripciones/getByCliente/:id`:
  - Retorna suscripciones con relaciones de cliente y fondo.

### 4) Transacciones
- `GET /transacciones`: lista todas las transacciones.
- `POST /transacciones`: crea una transacción manual enviando `tipo`.

## Requisitos
- Node.js 18+
- npm 9+
- MariaDB 10+ (local o en contenedor)

## Variables de entorno

Crea un archivo `.env` en la raíz con este contenido:

```env
PORT=3000
NODE_ENV=development
MARIADB_HOST=localhost
MARIADB_DATABASE=app_db
MARIADB_ROOT_PASSWORD=root123
MARIADB_USER=app_user
MARIADB_PASSWORD=app123
MARIADB_PORT=3306
NOT_TELF=BANANO
NOT_CORREO=SANCOCHO
```

## Ejecución del proyecto

### Opción A: Base de datos local (puerto 3306)
1. Instala dependencias:
   ```bash
   npm install
   ```
2. Ejecuta la API:
   ```bash
   npm run dev
   ```
3. La API quedará en:
   ```
   http://localhost:3000
   ```

### Opción B: Base de datos con Docker (incluida en el repo)
El `docker-compose.yml` expone MariaDB en `3308`.

1. Levanta MariaDB:
   ```bash
   docker compose up -d
   ```
2. Si usas Docker, actualiza temporalmente en `.env`:
   ```env
   MARIADB_PORT=3308
   ```
3. Ejecuta la API:
   ```bash
   npm run dev
   ```

## Script de base de datos (datos iniciales)

> Importante: las tablas se crean automáticamente con TypeORM (`synchronize: true`) al iniciar la API.
> Ejecuta primero `npm run dev` al menos una vez y luego corre el script seed.

### Script SQL

```sql
INSERT INTO categoria (nombre) VALUES ("FPV");
INSERT INTO categoria (nombre) VALUES ("FIC");

INSERT INTO fondos (nombre, montoMin, categoriaId) VALUES ("FPV BTG PACTUAL RECAUDADORA", 75000, 1);
INSERT INTO fondos (nombre, montoMin, categoriaId) VALUES ("FPV BTG PACTUAL ECOPETROL", 125000, 1);
INSERT INTO fondos (nombre, montoMin, categoriaId) VALUES ("DEUDA PRIVADA", 50000, 2);
INSERT INTO fondos (nombre, montoMin, categoriaId) VALUES ("FDO-ACCIONES", 250000, 2);
INSERT INTO fondos (nombre, montoMin, categoriaId) VALUES ("FPV BTG PACTUAL DINÁMICA", 100000, 1);
```

### Cómo ejecutarlo

Con cliente `mariadb`/`mysql` local:

```bash
mariadb -h localhost -P 3306 -uapp_user -papp123 app_db
```

Luego pega el bloque SQL anterior y ejecuta.

Si usas el contenedor de Docker del proyecto:

```bash
docker exec -it mariadb mariadb -uapp_user -papp123 app_db
```

Luego pega el bloque SQL anterior y ejecuta.

## Ejemplos de payload

### Crear cliente

```json
{
  "id": 1,
  "nombre": "Juan",
  "email": "juan@email.com",
  "telefono": "3001234567"
}
```

### Suscribirse / desuscribirse

```json
{
  "cliente": { "id": 1 },
  "fondos": { "id": 2 }
}
```

## Scripts npm
- `npm run dev`: levanta el servidor con nodemon.
- `npm start`: ejecuta el servidor con ts-node.
