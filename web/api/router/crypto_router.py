# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0


from fastapi import APIRouter, Depends, Request, UploadFile, File
from fastapi.responses import JSONResponse
from utils.auth import verify_token
import subprocess

from utils.sqlinjection import extract_tables
from database.fileDB import FileRetrieve, FileStore

router = APIRouter()


@router.post("/sql-injection")
async def sqlInjection(request: Request): #, id: str = Depends(verify_token)):
    try:
        command = "python sqlmap/sqlmap.py -u http://testphp.vulnweb.com/listproducts.php?cat=1 -D acuart --tables"
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        stdout, stderr = process.communicate()
        if process.returncode == 0:
           tables = extract_tables(stdout)
           return JSONResponse({ "success": True, "tables":tables})
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse({ "success": False, "message": "Something went wrong"})

@router.post("/image-encryption")
async def imageEncryption(request: Request, id: str = Depends(verify_token)):
    try:
        data = await request.json()
        result = await FileStore(id, data)
        return JSONResponse(result)
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse({ "success": False, "message": "Something went wrong"})

@router.post("/image-decryption")
async def imageDecryption(request: Request, id: str = Depends(verify_token)):
    try:
        data = await request.json()
        result = await FileRetrieve(data["code"])
        return JSONResponse(result)
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse({ "success": False, "message": "Something went wrong"})
