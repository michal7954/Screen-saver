@echo off

REM  -----------------------------------------------------------------------------------------------------------------
REM  Run firefox with url
REM  -----------------------------------------------------------------------------------------------------------------

CMDOW /RUN "C:\Program Files (x86)\Mozilla Firefox\firefox.exe" -url ./index.html

REM  -----------------------------------------------------------------------------------------------------------------
REM  Resize and move window (Added 6 pixels of projectors resolution inaccuracy)
REM  -----------------------------------------------------------------------------------------------------------------

timeout 4
CMDOW "Screensaver - Mozilla Firefox" /SIZ 5132 911 /MOV 1914 -105)
timeout 2
CMDOW "Control panel - Mozilla Firefox" /MOV 200 100