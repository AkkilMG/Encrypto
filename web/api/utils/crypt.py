# (c) 2022-2023, Akkil MG & Saiesh Savant
# License: GNU General Public License v3.0

import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives import padding

from config import KEY
# KEY = "Saiesh@Akkil"

def derive_key(password: str) -> bytes:
    digest = hashes.Hash(hashes.SHA256(), backend=default_backend())
    digest.update(password.encode())
    hashed_key = digest.finalize()
    return hashed_key

hashed_key = derive_key(KEY)

def encrypt(data: bytes) -> str:
    data = data.encode()
    cipher = Cipher(algorithms.AES(hashed_key), modes.ECB(), backend=default_backend())
    encryptor = cipher.encryptor()
    padder = padding.PKCS7(algorithms.AES.block_size).padder()
    padded_data = padder.update(data) + padder.finalize()
    ciphertext = encryptor.update(padded_data) + encryptor.finalize()
    ciphertext_base64 = base64.b64encode(ciphertext).decode()
    return ciphertext_base64


def decrypt(ciphertext_base64: str) -> bytes:
    ciphertext = base64.b64decode(ciphertext_base64)
    cipher = Cipher(algorithms.AES(hashed_key), modes.ECB(), backend=default_backend())
    decryptor = cipher.decryptor()
    padded_data = decryptor.update(ciphertext) + decryptor.finalize()
    unpadder = padding.PKCS7(algorithms.AES.block_size).unpadder()
    data = unpadder.update(padded_data) + unpadder.finalize()
    return data.decode()


# # Example usage:
# plaintext = "Hello, World!"
# ciphertext = encrypt(plaintext)
# print("Encrypted:", ciphertext)

# decrypted_data = decrypt(ciphertext)
# print("Decrypted:", decrypted_data)
