@echo off

:: for colored error message
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)

echo Check NPM version
call npm -v 2> Nul
if "%errorlevel%" == "1" (
    call :ColorText 0C "YOU HAVE NOT NPM binary" && exit /b
)
for /f "delims=" %%i in ('npm -v') do set Version=%%i
REM parse version numbers
for /F "tokens=1,2,3 delims=." %%a in ("%Version%") do (
   set Major=%%a
   set Minor=%%b
   set Revision=%%c
)
if %Major% LSS 4 (
	call :ColorText 0C "YOUR HAVE NOT REQUIRED VERSION NPM (Higher or equal 4.1.2)" && exit /b
)

echo Check Node version
call node -v 2> Nul
if "%errorlevel%" == "1" (
    call :ColorText 0C "YOU HAVE NOT NodeJS binary" && exit /b
)
for /f "delims=" %%i in ('node -v') do set Version=%%i
REM get version number
for /F "tokens=1 delims=v" %%a in ("%Version%") do (
   set VersionNumber=%%a
)
REM parse version numbers
for /F "tokens=1,2,3 delims=." %%a in ("%VersionNumber%") do (
   set Major=%%a
   set Minor=%%b
   set Revision=%%c
)
if %Major% LSS 7 (
	call :ColorText 0C "YOUR HAVE NOT REQUIRED Major VERSION NodeJS (Higher or equal 7.6.0)" && exit /b
)

echo Installing packages...
call npm install || echo ERROR in installed packages backend&& exit /b

echo Running server
call npm start --silent || echo ERROR in running server && exit /b

echo Finished !!!


:: for colored error message
goto :eof
:ColorText
<nul set /p ".=%DEL%" > "%~2"
findstr /v /a:%1 /R "^$" "%~2" nul
del "%~2" > nul 2>&1
goto :eof


