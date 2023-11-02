import Database from 'better-sqlite3'
import { stripIndents } from 'common-tags'

const db = new Database('products.db', { fileMustExist: true })

// ? Crear tablas si NO existen
db.prepare(stripIndents`
  CREATE TABLE IF NOT EXISTS "products" (
    "id" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "price" INTEGER,
    "discountPercentage" INTEGER,
    "rating" INTEGER,
    "stock" INTEGER,
    "brand" TEXT,
    "category" TEXT,
    "thumbnail" TEXT,
    PRIMARY KEY("id" AUTOINCREMENT)
  )
  `).run()

export default db
