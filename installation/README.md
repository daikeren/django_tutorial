# 安裝 Django

在開始之前，我們先在我們的根目錄下面建立一個我們工作的目錄。

```
mkdir django_tutorial
```

切換到我們剛剛建立的目錄下

```
cd django_tutorial
```

## virtualenv

在我們開發 Python 專案的時候，我們通常都會使用 virtualenv。使用 virtualenv 的好處如下：

1. 我們會希望可以為每一個專案創造出獨立的環境。如此才不會因為其他專案的 Library 升級而導致專案出問題。
2. 當我們的專案要移到其他機器上頭的時候，相依的套件比較好處理

在 ubuntu 當中可以直接用 apt-get 來安裝 virtualenv。

```
sudo apt-get install python-virtualenv
```

其他的安裝方式可以參考 [virtualenv 的官網](https://virtualenv.pypa.io/en/latest/)。

安裝好之後，讓我們來建立一個 virtualenv 環境，在 terminal 底下輸入：

```
virtualenv VENV
```

接下來輸入

```
source VENV/bin/activate
```

就可以啟動 virtualenv，從此只要在 virtualenv 下面安裝的 package 都只會存在于這個 virtualenv 當中。

## Install Django

安裝 Django 十分簡單，只要透過 pip 就可以完成。在 terminal 底下輸入：

```
pip install django
```

便會下載最新版的 django 並且完成安裝。
