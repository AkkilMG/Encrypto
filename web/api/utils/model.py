# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0

from pydantic import BaseModel
from typing import Optional

class SignupModel(BaseModel):
    name: str
    email: str
    password: str

class SigninModel(BaseModel):
    email: str
    password: str
