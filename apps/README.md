# Django APPs

接下來讓我們來正式開始寫我們的 Django Project 吧！Django Project 是由一個個的 Django APP 所組成，對於剛學習 Django 的人來說，可能會不知道所謂的 Django APP 是什麼。其實一個 Django APP 很簡單，一般來說我們會希望一個 Django APP 能夠 "do one thing and do it well." 也就是說盡可能的讓功能單純，這樣子不管是在測試或是管理方面可以更方便一些。

舉個例子來說，如果你要建立一個網路購物網站，那麼可能會有以下的 app

* account: 管理使用者帳號
* product: 管理商品
* order: 管理訂單
* shipping: 管理物流


## 第一個 Django APP

還記得剛剛的 manage.py 嗎？在這邊我們也會用 manage.py 來創建我們的第一個 Django APP。要創建 Django APP，首先，我們先來創建一個管理文章的 Django APP，我們叫做 article 好了。在 shell 底下輸入：

```
pipenv run python manage.py startapp article
```

我們可以看到建立起了一個叫做 article 的目錄，在 article 這個目錄底下我們會看到以下的檔案：

```
.
├── __init__.py
├── admin.py
├── apps.py
├── migrations
│   └── __init__.py
├── models.py
├── tests.py
└── views.py
```

這樣就順利的建立起我們第一個 app 的目錄。在接下來的章節我們會來看看其中的檔案，不過現在我們暫時不管他。

接著我們要讓 Django 知道我們有了 article 這個 APP，讓我們打開 blog 資料夾中 settings.py 這個檔案。這個檔案顧名思義就是管理所有跟 Django 相關的設定。找到 settings.py 當中的 INSTALLED_APPS 這個變數，在最下面加上 'article' 就成功的讓 Django 知道會有一個叫做 article 的 APP。

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'article',
]
```
