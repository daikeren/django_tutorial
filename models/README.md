# Django 與資料庫的互動 - Django Model

這個章節我們會講到 Django 要如何跟資料庫做互動。

## Setting Database

使用 Django 的最大好處之一就是 Django 原生支援許多的資料庫，只要經過簡單的設定，你可以輕鬆從 sqlite 轉換到 MySQL 甚至是 Oracle。為了我們現在開發方便，我們就先用最簡單的 sqlite 吧！

Django 當中跟資料庫相關的設定，都在 settings.py 當中。打開 blog/settings.py 這個檔案，找到並且修改成以下的程式碼：

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': '/tmp/blog',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}
```

在這邊，我們指定了 database engine 為 sqlite3，當然你也可以使用 MySQL、Oracle 等等其他資料庫。另外還要指定我們要連的 database 名稱、使用者、密碼、HOST 以及 PORT。在這邊由於我們是用 sqlite，所以名稱的部分就填上一個檔案路徑。

## Django Model

在 Django 當中，我們是透過 Django Model 來跟資料庫做互動。在這邊，我們透過寫 Django Model，讓資料庫能夠產生相對應的 Table，關於 Model 基本的概念如下：

* 每一個 Django Model 都繼承自 django.db.models.Model
* 在 Model 當中的每一個 attribute 都代表了一個 database field
* Django 讓我們可以透過 Model API 來執行 database query，這代表你可以儘量不用寫 SQL

既然這是一個 blog 網站，那麼首先我們當然要來建立一個儲存文章的 Model。另外我們也希望建立一個儲存類別(category) 的 Model。

關於 Model 的資訊，我們都會放在 APP 目錄當中的 models.py 裡面。打開 articles/models.py，輸入

```python
from django.db import models

class Category(models.Model):
    name = models.CharField(u'Name', max_length=50)

    def __unicode__(self):
        return self.name

class Article(models.Model):
    content = models.TextField(u'Content')
    title = models.CharField(u'Title', max_length=50)
    category = models.ForeignKey('Category', null=True)

    def __unicode__(self):
        return self.title
```

在此，我們建立了兩個 Model，一個是 Category，代表了類別，另外一個則是 Article，代表了文章。這兩個 Model 都繼承自 django.db.models.Model。

首先先讓我們看看 Category 這個 Model。這個 Model 我們宣告了一個叫做 name 的 attribute，它的形態是 [models.CharField](https://docs.djangoproject.com/en/dev/ref/models/fields/#charfield)，另外 max_length 則代表了 name 最大長度為 50。

此外，我們也宣告了一個 ```__unicode__(self)``` function 來表示 Category 物件要如何以 unicode 表示自己，在此我們直接用類別的名字做表示。

Article 這個 Model 跟 Category Model 很類似，我們有三個屬性，content 代表文章內容，title 代表標題，category 是代表 Article 跟 Category 會建立起資料庫當中的關聯性，在這邊我們用 ForeignKey 來建立起關係。

## 實際建立資料表

上面的 code 只是告訴 Django table 要長什麼樣子，接下來要真正的在資料庫中把 table 生出來。

要把 table 生出來一樣要使用 manage.py 這個指令，我們透過 syncdb 來產生 table。syncdb 會根據 settings.py 裡面 INSTALLED_APPS 當中的 Django APP 當中的 models.py 中的 Model 生出相對應的 table，打開你的 shell 輸入：

```
python manage.py syncdb
```

就會完成生成 table 的生成。在這邊，你會看到因為我們在 INSTALLED_APPS 當中有使用 Django 的 auth 系統，因此 Django 會問你是否需要創建 superuser，在這邊你可以輸入一個你喜歡的 username 還有密碼，在下一章節會使用到。

## 讓我們來玩玩 Model 吧

在 syncdb 之後，我們在 terminal 中輸入

```
python manage.py shell
```

來開啟一個跟原生 python 很相像的 interactive shell，跟一般 python 的差別只有我們可以在這個 shell 當中存取 Django Project 當中的 Model 等等資訊。

打開 shell 之後，我們輸入下面的指令

```python
>>> from article.models import Article, Category
>>> Article.objects.create(content="Test1", title="article 1")
>>> Article.objects.create(content="Test2", title="article 2")
>>> c = Category.objects.create(name="category 1")
>>> Article.objects.create(content="Test3", title="article 3", category=c)
```

在這邊，我們創建了 3 個 Article 物件，把它們塞到了 database 當中。可以看到我們在這邊沒有寫任何的 SQL 就完成了 insert 資料到 database 的動作。

如果要查詢所有 Article 的資料，

```python
>>> Article.objects.all()
>>> for article in Article.objects.all():
>>>     print article.title
```

取出一個 title 為 "article 1" 的 Model，修改它的 title 之後再儲存。

```python
>>> a = Article.objects.get(title="article 1")
>>> a.title = "Article"
>>> a.save()
```

其他更多的 query API 可以參考 [Django 的官方文件](https://docs.djangoproject.com/en/1.6/ref/models/querysets/)，透過 Django Model 提供的 API，讓你幾乎可以不用寫 SQL 就可以完成許多跟 Database 的操作。

## 練習

* 除了我們有用到的 all(), create(), get() 等等方法之外，看看還有什麼 Queryset API 可以玩呢？來玩玩看 delete(), filter() 吧。
* 每個 Article object 除了我們自定的那些欄位之外還有什麼欄位呢？看看 pk 這個欄位吧！
