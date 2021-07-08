@echo off 

echo "Project location at " %~dp0
@REM  remove  old web application 
 rmdir  /s "%~dp0\backend/public/build" 
 if %ERRORLEVEL% == 0 (
	echo.
	echo remove build passed.
	echo.
) else (
	goto BEGIN_ERROR_MSG
)

@REM  upload build react to static web 
 echo D |xcopy /s "%~dp0\build" "%~dp0\backend/public/build" /K /D /H /Y
if %ERRORLEVEL% == 0 (
	echo.
	echo upload build passed.
	echo.
) else (
	goto BEGIN_ERROR_MSG
)

goto END_PROGRAM

:BEGIN_ERROR_MSG
if %ERRORLEVEL% == 1 (
    echo Remove folder error.
) else if %ERRORLEVEL% == 2 (
     echo Copy folder error.
)
:END_ERROR_MSG

:END_PROGRAM
echo DEPLOY COMPLETE
pause