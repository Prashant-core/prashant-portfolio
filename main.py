from fastapi import FastAPI, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# CORS middleware (needed for Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static directory for CSS, JS, and Images
app.mount("/static", StaticFiles(directory="static"), name="static")

# Setup Jinja2 templates directory
templates = Jinja2Templates(directory="templates")

# Import your data
from data.portfolio_data import portfolio

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "request": request,
            "portfolio": portfolio
        }
    )

@app.post("/contact")
async def contact(
    name: str = Form(...),
    email: str = Form(...),
    message: str = Form(...)
):
    try:
        sender = os.getenv("EMAIL_USER")
        password = os.getenv("EMAIL_PASS")
        receiver = os.getenv("EMAIL_USER")

        if not sender or not password:
            return JSONResponse({"status": "error", "detail": "Email not configured"})

        msg = MIMEText(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")
        msg["Subject"] = f"Portfolio Contact — {name}"
        msg["From"] = sender
        msg["To"] = receiver

        with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.login(sender, password)
            smtp.sendmail(sender, receiver, msg.as_string())

        return JSONResponse({"status": "success"})

    except Exception as e:
        print(f"Email error: {e}")
        return JSONResponse({"status": "error", "detail": str(e)})

# Required for Vercel — exposes the app as a module-level variable
# Vercel looks for 'app' at module level
app = app