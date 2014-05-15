# 把你的 Django Project 丟上雲端

好不容易做了網站，接下來讓我們把我們的網站丟上去讓大家看看吧！在這邊，我們使用最常見的 [Heroku](https://www.heroku.com/) 來當作我們的 hosting。Heroku 免費的額度基本上拿來做些小的網站都相當夠用！

以下假設你都已經註冊好了 heroku 的帳號了。接下來讓我們開始把我們的 Project 丟上去吧！

首先，在我們剛剛建好的 virtualenv 下面先安裝 django-toolbelt 這個套件。

```pip install django-toolbelt```

django-toolbelt 是個讓我們的 Django Project 可以更容易地在 heroku 上面運行的套件。

裝好之後，在 blog 目錄下面新增 Procfile，內容是

```
web: python manage.py runserver 0.0.0.0:$PORT
```

Procfile 的目的是告訴 heroku 啟動這個 web project 的時候要跑怎麼樣的指令，這邊我們暫時直接用原本的 runserver 來啟動。

接下來，在 blog/settings.py 最底下加上以下幾行

```python
import os
if os.getenv('DATABASE_URL') is not None:
    import dj_database_url
    DATABASES['default'] = dj_database_url.config()
```

dj_database_url 是在安裝前面所說的 django-toolbelt 會一併安裝的套件。Heroku 透過它來找到資料庫相關參數，如資料庫名稱、帳號、密碼等等。並且設定到 DATABASE dictionary 當中。Heroku 會透過設定 DATABASE_URL 這個環境變數來得到資料庫相關的設定，因此我們藉由判斷 DATABASE_URL 這個環境變數是否存在，來決定 DATABASE 要使用我們原本的設定或是用 Heroku 提供的設定。

接著我們把目前安裝的套件資訊都放到 requirements.txt 當中，如此 Heroku 才會知道要幫我們安裝哪些套件

```pip freeze > requirements.txt```

Heroku 是透過 git 來做 deployment 的。所以接下來，我們來初始化我們的 git repository.

```
git init
git add .
git commit -m "First commit"
```

接下來創建一個 Heroku 專案

```
heroku create
```

之後我們的任何修改只要有 commit，都可以透過

```
git push heroku master
```

來完成 deployment。

push 之後還剩下一件小事情要完成，還記得 syncdb 嗎？我們得要在 Heroku 的機器上面實際創建我們的 Model。我們可以透過 heroku command line tool 來完成這樣件事情。

```
heroku run python manage.py syncdb
```

最後輸入

```
heroku open
```

沒有意外的話應該可以看到瀏覽器開啟，你的 Django Project 就丟上去雲端了！

**附註：上面敘述的方法其實並不完整，使用 runserver 實際上是會爆炸的，但是這邊是 tutorial，就以簡單為主。完整的流程請參考 [Heroku 官方文件](https://devcenter.heroku.com/articles/getting-started-with-django)
**

