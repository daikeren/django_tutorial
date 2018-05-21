# 把你的 Django Project 丟上雲端

好不容易做了網站，接下來讓我們把我們的網站丟上去讓大家看看。在這邊，我們使用最常見的 [Heroku](https://www.heroku.com/) 來當作我們的 hosting。Heroku 免費的額度基本上拿來做些小的網站應該是夠用。以下假設你都已經註冊好了 heroku 的帳號了。接下來讓我們開始把我們的 Project 丟上去。

首先，我們先輸入

```shell
heroku login
```

terimnal 會出現要輸入你所註冊的帳號以及密碼

爲了讓程式可以更方便的 deploy 到 heroku 上面，我們要安裝 `django-heroku` 這個 package，它會幫助我們完成一些相關的設定

```shell
pipenv install django-heroku
```

接着，我們在 blog/settings.py 最底下加上以下兩行

```python
import django_heroku
django_heroku.settings(locals())
```

接着，在 blog 目錄底下新增一個 Procfile，內容如下

```shell
web: gunicorn blog.wsgi
```

接着，我們要初始化 git repository

```shell
git init
```

把檔案加到 git repository 當中

```shell
git add .
git commit -m "First Commit"
```

創建 heroku app

```shell
heroku create
```

把你的 code 推到 heroku 上面

```shell
git push heroku master
```

創建資料庫

```shell
heroku run python manage.my migrate
```

開啓你的網站

```shell
heroku open
```

你會看到類似 `https://agile-waters-53872.herokuapp.com/` 這樣的 url，上面跟你的網站一樣，不過沒有資料。這是因爲你在 local 開發的時候使用的資料庫跟遠端不同，你可以連到 `/create/` 這個 url 創建你的文章。

好了，現在你已經把你的網站丟上去了。如果之後你有加任何功能，只要記得用 `git commit` 以及 `git push heroku master` 就可以更新。
