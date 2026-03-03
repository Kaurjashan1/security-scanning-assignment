import os
import sqlite3
import subprocess
import pickle
import hashlib

# VULNERABILITY: Hardcoded credentials (CWE-798)
DB_PASSWORD = "admin123"
SECRET_KEY = "hardcoded_secret_key_do_not_use!"
API_KEY = "sk-1234567890abcdef"

# VULNERABILITY: SQL Injection (CWE-89 / OWASP A03)
def get_user(username):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE username = '" + username + "'"
    cursor.execute(query)
    return cursor.fetchall()

# VULNERABILITY: OS Command Injection (CWE-78 / OWASP A03)
def ping_host(host):
    result = subprocess.call("ping -c 1 " + host, shell=True)
    return result

# VULNERABILITY: Insecure deserialization (CWE-502 / OWASP A08)
def load_user_data(data):
    return pickle.loads(data)

# VULNERABILITY: Weak hashing algorithm - MD5 (CWE-327)
def hash_password(password):
    return hashlib.md5(password.encode()).hexdigest()

# VULNERABILITY: Path traversal (CWE-22 / OWASP A01)
def read_file(filename):
    base_dir = "/var/www/files/"
    filepath = base_dir + filename
    with open(filepath, "r") as f:
        return f.read()

# VULNERABILITY: Use of eval() - arbitrary code execution (CWE-95)
def calculate(expression):
    return eval(expression)

# VULNERABILITY: Insecure random (not cryptographically secure)
import random
def generate_token():
    return str(random.randint(100000, 999999))

# VULNERABILITY: Broad exception suppression (CWE-390)
def connect_to_db():
    try:
        conn = sqlite3.connect("app.db")
        return conn
    except:
        pass

# VULNERABILITY: Debug mode enabled / sensitive data in logs
def login(username, password):
    print(f"[DEBUG] Login attempt - user: {username}, password: {password}")
    hashed = hash_password(password)
    users = get_user(username)
    if users:
        return True
    return False

if __name__ == "__main__":
    print(calculate("2 + 2"))
    print(generate_token())
    login("admin", "password123")
