# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0


from fastapi import APIRouter, Request, UploadFile, File
from fastapi.responses import JSONResponse

from database.authDB import Signin, Signup

router = APIRouter()

@router.post("/signin")
async def signin(request: Request):
    try:
        data = await request.json()
        result = await Signin(data)
        return JSONResponse(result)
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse({ "success": False, "message": "Something went wrong"})


@router.post("/signup")
async def signup(request: Request):
    try:
        data = await request.json()
        result = await Signup(data)
        return JSONResponse(result)
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse({ "success": False, "message": "Something went wrong" })

