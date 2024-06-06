# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0

from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding
from base64 import b64encode, b64decode

from config import KEY

async def encrypt(text: str) -> str:
    cipher = Cipher(algorithms.AES(KEY), modes.ECB(), backend=default_backend())
    encryptor = cipher.encryptor()
    padder = padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(text.encode('utf-8')) + padder.finalize()
    encrypted_data = encryptor.update(padded_data) + encryptor.finalize()
    ciphertext = b64encode(encrypted_data).decode('utf-8').replace('/', ':')
    return ciphertext

async def decrypt(ciphertext: str) -> str:
    encrypted_data = b64decode(ciphertext.replace(':', '/'))
    cipher = Cipher(algorithms.AES(KEY), modes.ECB(), backend=default_backend())
    decryptor = cipher.decryptor()
    padded_data = decryptor.update(encrypted_data) + decryptor.finalize()
    unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
    data = unpadder.update(padded_data) + unpadder.finalize()
    plaintext = data.decode('utf-8')
    return plaintext
