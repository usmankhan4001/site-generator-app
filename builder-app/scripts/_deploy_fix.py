"""One-off: write Dokploy API payload files (curl-friendly) for the builder app deploy."""
import json, io, os

APP_ID = "S8g8G9DObHIXQOyK5LBLS"
ENV_FILE = r"D:/GCC Startup/Airwallex-Cloner-Package/builder-app/.env"
OUT = r"C:/Users/Usman Khan/AppData/Local/Temp"

vals = {}
for line in io.open(ENV_FILE, encoding="utf-8"):
    line = line.strip()
    if not line or line.startswith("#") or "=" not in line:
        continue
    k, v = line.split("=", 1)
    vals[k.strip()] = v.strip().strip('"').strip("'")

env_lines = [
    "DATABASE_URL=file:./dev.db",
    f"BETTER_AUTH_SECRET={vals.get('BETTER_AUTH_SECRET','')}",
    "BETTER_AUTH_URL=http://localhost:3000",
    f"SUPER_ADMIN_EMAIL={vals.get('SUPER_ADMIN_EMAIL','')}",
    f"OPENROUTER_API_KEY={vals.get('OPENROUTER_API_KEY','')}",
    "PORT=3000",
    "NODE_ENV=production",
]

payloads = {
    "p_buildtype.json": {
        "applicationId": APP_ID, "buildType": "dockerfile",
        "dockerfile": "Dockerfile", "dockerContextPath": "builder-app",
        "dockerBuildStage": None, "herokuVersion": None, "railpackVersion": None,
        "isStaticSpa": False, "publishDirectory": None,
    },
    "p_git.json": {
        "applicationId": APP_ID,
        "customGitUrl": "https://github.com/usmankhan4001/site-generator-app.git",
        "customGitBranch": "main", "customGitBuildPath": "/builder-app",
        "customGitSSHKeyId": None, "enableSubmodules": False, "watchPaths": None,
    },
    "p_env.json": {
        "applicationId": APP_ID, "env": "\n".join(env_lines),
        "buildArgs": None, "buildSecrets": None, "createEnvFile": False,
    },
    "p_deploy.json": {"applicationId": APP_ID},
}

for name, payload in payloads.items():
    with io.open(os.path.join(OUT, name), "w", encoding="utf-8", newline="\n") as f:
        f.write(json.dumps(payload))
print("wrote:", ", ".join(payloads))
