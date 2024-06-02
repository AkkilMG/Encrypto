# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0

from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

from config import MONGODB_URL, DATABASE_NAME
from web.api.utils.auth import check_password
from web.api.utils.model import SigninModel, SignupModel

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DATABASE_NAME]


async def Signup(data: SignupModel):
    if (check:=await check_password(data.password))["success"] == False:
        return check
    result = await db.items.insert_one(data)
    return { "success": True, "id": str(result.inserted_id) }

async def Signin(data: SigninModel):
    if (await db.items.find_one({ "email": data.email, "password": data.password })):
        return { "success": True }
    elif not (await db.items.find_one({ "email": data.email, "password": data.password })):
        return { "success": False, "message": "Incorrect password" }
    elif not (await db.items.find_one({ "email": data.email })):
        return { "success": True, "message": "Incorrect email" }
    else:
        return { "success": False, "message": "Something went wrong" }
    
