# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0


from fastapi import APIRouter, Depends, Request, UploadFile, File
from fastapi.responses import JSONResponse

from web.api.utils.auth import verify_token

router = APIRouter()

@router.post("/sql-injection")
async def sqlInjection(request: Request, id: str = Depends(verify_token)):
    try:
        data = await request.json()
        return JSONResponse()
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse({ "success": False, "message": "Something went wrong"})

@router.post("/image-decryption")
async def imageEncryption(request: Request, id: str = Depends(verify_token)):
    try:
        data = await request.json()
        return JSONResponse()
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse({ "success": False, "message": "Something went wrong"})

@router.post("/image-decryption")
async def imageDecryption(request: Request, id: str = Depends(verify_token)):
    try:
        data = await request.json()
        return JSONResponse()
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse({ "success": False, "message": "Something went wrong"})
