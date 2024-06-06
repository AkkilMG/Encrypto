# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0

import os, dotenv
dotenv.load_dotenv()

KEY = os.getenv('KEY').encode('utf-8')
MONGODB_URL = os.getenv('MONGODB_URL')
DATABASE_NAME = os.getenv('DATABASE_NAME')