# First git clone the sqlmap in backend folder

from fastapi import FastAPI, HTTPException
import subprocess
import re
from fastapi.responses import JSONResponse

app = FastAPI()

def extract_tables(sqlmap_output):
    tables_section = re.search(r'Database: \w+\n\[(.*?)\]\n\+-----------\+\n((?:\| .+? \|\n)+)\+-----------\+', sqlmap_output, re.DOTALL)
    if tables_section:
        tables = tables_section.group(2)
        table_names = re.findall(r'\| (.+?) \|', tables)
        return table_names
    return []

@app.get("/run-sqlmap/")
def run_sqlmap():
    command = "python sqlmap-dev/sqlmap.py -u http://testphp.vulnweb.com/listproducts.php?cat=1 -D acuart --tables"
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    stdout, stderr = process.communicate()

    if process.returncode == 0:
        tables = extract_tables(stdout)
        return JSONResponse({ "success": True, "Tables":tables})
    else:
        raise HTTPException(status_code=500, detail=stderr)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000,debug=True)
