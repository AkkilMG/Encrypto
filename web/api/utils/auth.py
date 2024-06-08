# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0

import datetime
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

from config import KEY
from utils.crypt import decrypt, encrypt
security = HTTPBearer()

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, KEY, algorithms=["HS256"])
        user_id = decrypt(payload["id"])
        return user_id
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

# @app.post("/verify-token")
# async def verify_token_endpoint(user_id: str = Depends(verify_token)):
#     return {"success": True, "user_id": user_id}

async def create_token(id: str):
    try:
        encrypted_id = encrypt(id)
        # token = jwt.encode({"id": encrypted_id}, KEY, algorithm="HS256", expires_delta=datetime.timedelta(days=7))
        expiration_time = datetime.datetime.utcnow() + datetime.timedelta(days=7)
        payload = {
            "id": encrypted_id,
            "exp": expiration_time 
        }
        token = jwt.encode(payload, KEY, algorithm="HS256")
        return {"success": True, "token": token}
    except Exception as e:
        print(f"createToken: {e}")
        return {"success": False, "message": "Authentication failed"}

async def check_password(password: str) -> dict:
    if len(password) < 8:
        return {"success": False, "message": "Password must be at least 8 characters."}
    if not any(c.islower() for c in password):
        return {"success": False, "message": "At least one lowercase letter is required."}
    if not any(c.isupper() for c in password):
        return {"success": False, "message": "At least one uppercase letter is required."}
    if not any(c.isdigit() for c in password):
        return {"success": False, "message": "At least one digit is required."}
    if not any(c in "!@#$%^&*()-_=+[]{};':\"\\|,.<>/?" for c in password):
        return {"success": False, "message": "At least one special character is required."}
    return {"success": True}
