
import random, string
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

from config import MONGODB_URL, DATABASE_NAME
from utils.crypt import decrypt, encrypt

client = AsyncIOMotorClient(MONGODB_URL)
db = client[DATABASE_NAME]


async def FileStore(id: string, data: any):
    code = ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))
    data = {
        "name": data["name"],
        "ext": data["ext"],
        "durl": data["durl"],
        "code": code,
        "key": data["key"],
        "owner": ObjectId(id)
    }
    result = await db.file.insert_one(data)
    print(result)
    return { "success": True, "code": code }

async def FileRetrieve(code: str):
    result = await db.file.find_one({ "code": code })
    return { "success": True, "durl": result['durl'], 'name': result['name'] }