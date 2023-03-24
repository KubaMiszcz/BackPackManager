
RMDIR node_modules\.cache\gh-pages\https!github.com!KubaMiszcz!BackPackManager.git\ /S /Q
ng deploy --base-href=https://kubamiszcz.github.io/BackPackManager/
rem del node_modules\.cache\gh-pages\https!github.com!KubaMiszcz!BackPackManager.git\*.* /f /q
rem RMDIR node_modules\.cache\gh-pages\https!github.com!KubaMiszcz!BackPackManager.git\.git /S /Q
rem rm node_modules\.cache\