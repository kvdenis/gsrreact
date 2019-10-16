# gsrreact

Необходимо доработать

1) страница регистрации
/createuser
передаются параметры POST: 
surname
name
lastname
city
gender
birthday
phone
email
address
ticket - номмер членского билета
password

2) авторизация и регистраци с пмощью соцсетей
/loginsocuserpass
передаются параметры POST которые приходят из соцсети:
id
email
token
image
surname
name
social

3) авторизация по touchId

4) список сообществ
Этот пункт надо обсудить. Скорее всего он сильно упростится
тк они размещают там просто информацию о сообществе с внешними ссылками
получить список
/get_blog_page?page=0&city=X
получить отдельное сообщество
/get_favorite_page?part=6&page=0&userid=X
открытое сообщество
/get_blog_by_id?id=X
список постов в открытом сообществе (x - id сообщества)
/get_bloglist_page?page=0&blog=X


5) магазин подарков
список подарков
/get_presents_page?page=0
открытый подарок
/get_presents_by_id?id=X
добавить подарок в корзину
/addtocart
передаем POST: userid, presentid
получить список подарков в корзине
/get_cart?userid=X
получить ичторию заказов
/get_cart_history?userid=X
удалить подарок из корзины
/removefromcart
передаем POST: cartid
оформить заказ
/bothcart
передаем POST: userid

6) Стартовый запуск приложения как в оригинале

7) Редактирвоание данных в профиле
/userupdate
передаем POST:
surname
name
lastname
city
gender
birthday
phone
email
address
ticket
password
id
token

8) Передлать првильно стурктуру файлов

