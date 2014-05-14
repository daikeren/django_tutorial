# Django 與資料庫的互動 - Django Model

這個章節我們會講到 Django 要如何跟資料庫做互動。

## Settings Database

使用 Django 的最大好處之一就是 Django 原生支援許多的資料庫，只要經過簡單的設定，你可以輕鬆從 sqlite 轉換到 MySQL 甚至是 Oracle。為了我們現在開發方便，我們就先用最簡單的 sqlite 吧！

Django 當中跟資料庫相關的設定，都在 settings.py 當中。打開 blog/settings.py 這個檔案，找到並且修改成以下的程式碼：

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': '/tmp/blog',                      # Or path to database file if using sqlite3.
        'USER': '',                      # Not used with sqlite3.
        'PASSWORD': '',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}
```

在這邊，我們指定了 database engine 為 sqlite3，當然你也可以使用 MySQL、Oracle 等等其他資料庫。另外還要指定我們要連的 database 名稱、使用者、密碼、HOST 以及 PORT。在這邊由於我們是用 sqlite，所以名稱的部分就填上一個檔案路徑。

## Django Model

在 Django 當中，我們是透過 Django Model 來跟資料庫做互動。在這邊，我們透過寫 Django Model，讓資料庫能夠產生相對應的 Table，關於 Model 基本的概念如下：

* 每一個 Django Model 都繼承自 django.db.models.Model
* 在 Model 當中的每一個 attribute 都代表了一個 database field
* Django 讓我們可以透過 Model API 來執行 database query，這代表你可以儘量不用寫 SQL

既然這是一個 blog 網站，那麼首先我們當然要來建立一個儲存文章的 Model。另外我們也希望建立一個儲存標簽(tag) 的 Model。

關於 Model 的資訊，我們都會放在 APP 目錄當中的 models.py 裡面。打開 articles/models.py，輸入

```python
from django.db import models

class Tag(models.Model):
    name = models.CharField(u'Name', max_length=50)

    def __unicode__(self):
        return self.name

class Article(models.Model):
    content = models.TextField(u'Content')
    title = models.CharField(u'Title', max_length=50)
    tags = models.ManyToManyField('Tag', null=True)

    def __unicode__(self):
        return self.title
```

在此，我們建立了兩個 Model，一個是 Tag，代表了標簽，另外一個則是 Article，代表了文章。這兩個 Model 都繼承自 django.db.models.Model。
