# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0


import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from config import *
import router.auth_router as auth_router
import router.crypto_router as crypto_router

app = FastAPI(
    title="Cryptography-Project",
    description="This is an application as a service to provide cryptography project.",
    version="0.0.2",
    contact={
        "name": "Akkil M G",
        "url": "http://github.com/HeimanPictures",
    },
    license_info={
        "name": "GNU GENERAL PUBLIC License v3.0",
        "url": "https://www.gnu.org/licenses/gpl-3.0.en.html",
    },
    docs_url="/method",
    redoc_url="/",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.get("/")
async def home():
    return JSONResponse({ "success": True })

app.include_router(auth_router.router, prefix="/api/auth")
app.include_router(crypto_router.router, prefix="/api/crypto")


if __name__ == "__main__":
    try:
        print('------------------- Initalizing Web Server -------------------')
        print('----------------------- Service Started -----------------------')
        uvicorn.run("app:app", host="0.0.0.0", port=7000, reload=True)
    except KeyboardInterrupt:
        print('----------------------- Service Stopped -----------------------')