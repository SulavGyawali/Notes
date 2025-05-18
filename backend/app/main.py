from fastapi import FastAPI
from .routers import users, auth, notes
from dotenv import load_dotenv
import psycopg2 as pg
from psycopg2.extras import RealDictCursor
import time
from .database import engine
from . import models

models.Base.metadata.create_all(bind=engine)

# Load environment variables from .env file
load_dotenv()

# print(POSTGRES_USER)

app = FastAPI()

while True:
    try:
        conn = pg.connect(
            dbname= "notes",
            user="admin",
            password="1",
            host="localhost",
            port="5432",
            cursor_factory=RealDictCursor
        )
        cur = conn.cursor()
        print("Connected to the database")
        cur.execute("CREATE TABLE IF NOT EXISTS notes (id serial PRIMARY KEY, author VARCHAR(50), title VARCHAR(50), description TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, user_id INTEGER REFERENCES users(id))")
        cur.execute("CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, username VARCHAR(50), email VARCHAR(50), password VARCHAR(100))")
        conn.commit()
        break
    except Exception as e:
        print(e)
        print("Failed to connect to the database")
        time.sleep(5)

# Root endpoint
@app.get("/")
async def read_root():
    return {"message": "Welcome to Notes API"}

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(notes.router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="notes-api", port=8000)

# Run with: uvicorn main:app --reload
