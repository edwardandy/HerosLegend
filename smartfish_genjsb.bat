@echo off

:: This script is used to generate jsbinding glue codes.
:: Android ndk version must be ndk-r9b.

setlocal
:: You should modify PYTHON_ROOT and NDK_ROOT to work under your environment.
:: or just uncomment the follow 2 lines and set them.

:: set PYTHON_ROOT=D:/Program Files/Python2.7.6
:: set NDK_ROOT=E:/project/android-ndk-r9b

setlocal ENABLEEXTENSIONS
if %errorlevel% neq 0 (
    echo Unable to enable extensions
    exit /b 1
    )

if defined PYTHON_ROOT (echo PYTHON_ROOT is defined.) else (
    echo PYTHON_ROOT is NOT defined!
    exit /b 1
    )

if defined NDK_ROOT (echo NDK_ROOT is defined.) else (
    echo NDK_ROOT is NOT defined!
    exit /b 1
    )

:: Check use 32-bit or 64-bit
:: Assume 64-bit
set TEMP=windows-x86_64
if not exist "%NDK_ROOT%/toolchains/llvm-3.3/prebuilt/%TEMP%" set TEMP=
:: Otherwise fall back to 32-bit make
if "%TEMP%"=="" set TEMP=windows

set NDK_LLVM_ROOT=%NDK_ROOT%/toolchains/llvm-3.3/prebuilt/%TEMP%

if defined COCOS_CONSOLE_ROOT (echo COCOS_CONSOLE_ROOT is defined.) else (
    echo COCOS_CONSOLE_ROOT is NOT defined!
    exit /b 1
    )

set CXX_GENERATOR_ROOT=%COCOS_CONSOLE_ROOT%/../../bindings-generator
set "CXX_GENERATOR_ROOT=%CXX_GENERATOR_ROOT:\=/%"
set OUTPUT_DIR=%cd%/frameworks/runtime-src/Classes/scripting/generated
set "OUTPUT_DIR=%OUTPUT_DIR:/=\%"

:: set the tools path into PATH
set PATH=%PATH%;%CXX_GENERATOR_ROOT%/libclang;%CXX_GENERATOR_ROOT%/tools/win32;%PYTHON_ROOT%

:: write userconf.ini
set _CONF_INI_FILE=%cd%\userconf.ini
if exist %_CONF_INI_FILE% del /Q %_CONF_INI_FILE%


echo
echo generating userconf.ini...
echo ---
echo [DEFAULT] > %_CONF_INI_FILE%
echo androidndkdir=%NDK_ROOT% >> %_CONF_INI_FILE%
echo clangllvmdir=%NDK_LLVM_ROOT% >> %_CONF_INI_FILE%
echo cxxgeneratordir=%CXX_GENERATOR_ROOT% >> %_CONF_INI_FILE%
:: fixme: to fix parse error, we must difine __WCHAR_MAX__ here.
echo extra_flags=-D__WCHAR_MAX__=0x7fffffff >> %_CONF_INI_FILE%
echo ---



:: Generate bindings for cocos2dx
echo "Generating bindings for simpletest with Android headers..."
python %CXX_GENERATOR_ROOT%/generator.py %cd%/cocos2dx_smartfish.ini -t spidermonkey -s testandroid -o %OUTPUT_DIR%
if %errorlevel% neq 0 goto ERROR

:: Change the generated file format from DOS to UNIX.
pushd "%OUTPUT_DIR%"
dos2unix *
popd

goto PASS

:PASS
echo ---------------------------------
echo Generating bindings succeeds.
echo ---------------------------------
endlocal
exit /b 0

:ERROR
echo ---------------------------------
echo Generating bindings fails.
echo ---------------------------------
endlocal
exit /b 1

