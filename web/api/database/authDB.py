# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0

from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

from config import MONGODB_URL, DATABASE_NAME
from utils.auth import check_password, create_token
from utils.model import SigninModel, SignupModel
from utils.crypt import decrypt, encrypt

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DATABASE_NAME]


async def Signup(data: SignupModel):
    if (await db.users.find_one({ "email": data["email"] })):
        return { "success": False, "message": "Email already exists" }
    if (check:=await check_password(data['password']))["success"] == False:
        return check
    data['password'] = await encrypt(data['password'])
    result = await db.users.insert_one(data)
    return { "success": True, "id": str(result.inserted_id) }

async def Signin(data: SigninModel):
    if (data:=await db.users.find_one({ "email": data["email"], "password": await decrypt(data["password"]) })):
        token = await create_token(data["_id"])
        return { "success": True, 'token': token }
    elif not (await db.users.find_one({ "email": data["email"], "password": data["password"] })):
        return { "success": False, "message": "Incorrect password" }
    elif not (await db.users.find_one({ "email": data["email"] })):
        return { "success": True, "message": "Incorrect email" }
    else:
        return { "success": False, "message": "Something went wrong" }
    
