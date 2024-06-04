# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0


from fastapi import APIRouter, Depends, Request, UploadFile, File
from fastapi.responses import JSONResponse
from web.api.utils.auth import verify_token
import subprocess
import re

router = APIRouter()

def extract_tables(sqlmap_output):
    tables_section = re.search(r'Database: \w+\n\[(.*?)\]\n\+-----------\+\n((?:\| .+? \|\n)+)\+-----------\+', sqlmap_output, re.DOTALL)
    if tables_section:
        tables = tables_section.group(2)
        table_names = re.findall(r'\| (.+?) \|', tables)
        return table_names
    return []

@router.post("/sql-injection")
async def sqlInjection(request: Request, id: str = Depends(verify_token)):
    try:
        command = "python sqlmap-dev/sqlmap.py -u http://testphp.vulnweb.com/listproducts.php?cat=1 -D acuart --tables"
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        stdout, stderr = process.communicate()

        if process.returncode == 0:
           tables = extract_tables(stdout)
           return JSONResponse({ "success": True, "Tables":tables})
    
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
