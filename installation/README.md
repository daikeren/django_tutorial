# 安裝 Django

在開始之前，我們先在我們的根目錄下面建立一個我們工作的目錄。

```
mkdir django_tutorial
```

切換到我們剛剛建立的目錄下

```
cd django_tutorial
```

## 安裝與設定 Python

我們將會使用 Django 2.0 作爲教學的版本，Django 2.0 之後都只支援 Python3，如果要使用 Python2，請使用 Django 1.11。下面是不同 OS 安裝 Python3 的說明。

### MacOS

在 MacOS 底下請先安裝好 [HomeBrew](https://brew.sh/)，安裝完成之後，輸入：

`brew install python3`

接着，輸入 `python3`，如果出現類似以下的畫面就代表安裝完成

```shell
Python 3.6.5 (default, Apr 25 2018, 14:23:58)
[GCC 4.2.1 Compatible Apple LLVM 9.1.0 (clang-902.0.39.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

### Linux

我們這裏以 ubuntu 爲例，如果你是使用其他的 Linux distribution，請各自參考自己的套件管理。

`sudo apt update -y && sudo apt install python3 python3-venv -y`

接着，輸入 `python3`，如果出現類似以下的畫面就代表安裝完成

```shell
Python 3.6.5 (default, Apr 25 2018, 14:23:58)
[GCC 4.2.1 Compatible Apple LLVM 9.1.0 (clang-902.0.39.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

### Windows

在 Windows 底下，請參考 [Python Releases for Windows](https://www.python.org/downloads/windows/)，下載 Python 3.4 之後的版本安裝。

接着，輸入 `python3`，如果出現類似以下的畫面就代表安裝完成

```shell
Python 3.6.5 (default, Apr 25 2018, 14:23:58)
[GCC 4.2.1 Compatible Apple LLVM 9.1.0 (clang-902.0.39.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

## Install Django

安裝 Django 十分簡單，只要透過 pip 就可以完成。在 terminal 底下輸入：

```
pip install django
```

便會下載最新版的 django 並且完成安裝。

要確認 django 有沒有安裝好，請輸入 `pipenv run python -m django --version`

如果出現 2.0 以上就代表你有順利的安裝好。
