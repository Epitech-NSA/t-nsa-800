# 🧠 API_BACK_T_NSA
## 🚀 Prerequisites

- Docker & Docker Compose installed
- Yarn installed globally (`npm install -g yarn`)
- Properly configured `.env` file (see below)

---

## 🗂️ Project Structure

```
project-root/
├── backend/           → Express API + TypeORM source code
├── frontend/          → React CRA frontend
├── docker/
│   ├── dev/           → Docker Compose for development
│   └── prod/          → Docker Compose for production
├── .env               → Environment variables (dev)
├── .env.prod          → Environment variables (prod)
```

---

## ⚙️ Environment Configuration
### `.env.dev` (Development)

```env
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=dev_db
DB_HOST=db
REACT_APP_API_URL=http://localhost:3000
WINSTON_SOURCE_TOKEN=
WINSTON_INVESTING_HOST=
```

### `.env.production` (⚠️ Must be secured)

```env
MYSQL_ROOT_PASSWORD= # inject this via a secret manager
MYSQL_DATABASE=prod_db
DB_HOST=db
REACT_APP_API_URL=http://api.yourdomain.com
WINSTON_SOURCE_TOKEN=
WINSTON_INVESTING_HOST=
```

**💡 Best Practices:**

- Never commit `.env.production` to version control
- Use secret managers like Vault, Doppler, AWS Secrets Manager, ..etc
- Always use a strong password for `MYSQL_ROOT_PASSWORD`

---

## 🐳 Running the Project with Docker
### ✅ Development

```bash
cd docker/dev
docker-compose --env-file ../../.env.dev up --build
```

Access:
- Express API: http://localhost:3000
- React UI: http://localhost:8080
- Swagger Stats (monitoring): http://localhost:3000/swagger-stats/ui

### ✅ Production

```bash
cd docker/prod
docker compose --env-file ../../.env.prod up --build -d
```

---

## 🧱 Creating an Admin User via Migration
### 📥 After cloning the project:

```bash
yarn
yarn run typeorm migration:create -n CreateAdminUser
```

This will generate a migration file inside `src/migration`.

### ✍️ Replace the `up()` function with:

```ts
public async up(queryRunner: QueryRunner): Promise<any> {
  const user = new User();
  user.username = 'admin';
  user.password = 'admin'; // ⚠️ CHANGE THIS PASSWORD!
  user.hashPassword();
  user.role = 'ADMIN';

  const userRepository = getRepository(User);
  await userRepository.save(user);
}
```

And at the top of the file, add:

```ts
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entity/User";
```

> ✅ **Security Tip:**
> Never leave default passwords in migrations. Use environment-based seeds or a dynamic seed script for initialization.

---

## 📬 Contact / Maintainer

For questions, support, reach out to the project maintainer.
