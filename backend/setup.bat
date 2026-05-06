@echo off
REM Campaign Pilot - Backend Setup Script (Windows)

echo Campaign Pilot - Backend Setup
echo ==============================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed. Please install Python 3.9 or higher.
    exit /b 1
)

echo OK - Python found:
python --version
echo.

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

echo.
echo OK - Backend setup complete!
echo.
echo To start the server, run:
echo   venv\Scripts\activate.bat
echo   uvicorn main:app --reload --port 8000
echo.
echo API will be available at http://localhost:8000
echo API docs: http://localhost:8000/docs
