docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build

ребования к выполнению тестового задания:

- все описанные задачи необходимо выполнить самостоятельно, вручную. Для реализации вспомогательных задач разрешено использовать сторонние библиотеки
- заранее предусматривать дальнейшее развитие проекта
- инструкция по развертыванию сервера

Применение паттернов проектирования приветствуется

Задача 1
Разработать приложение при помощи которого можно создавать и хранить некоторый набор кулинарных рецептов по категориям.

- разработать CRUD для категорий рецептов
- разработать CRUD для рецептов
- данные хранить в базе данных
- для упрощения задачи считать что категории могут содержать только текстовое название
- количество категорий, количество подкатегорий и количество уровней категорий не ограничено
- для упрощения задачи считать что рецепт может содержать только название и сам рецепт, все данные текстовые

Задача 2
Добавить в задачу 1 возможность добавления статей

- разработать CRUD для статей
- статьи, как и рецепты, относятся к категориям
- для упрощения задачи считать что статья может содержать только название, краткое описание и саму статью, все данные текстовые

Задача 3
Разработать API

- по идентификатору статьи или рецепта возвращает полный перечень категорий, к которым относится указанный ресурс, в порядке вложенности
- по идентификатору возвращает статью или рецепт
- по идентификатору категории возвращает полный список статей или рецептов данной категории
- по идентификатору категории возвращает полный перечень категорий, к которым относится указанный ресурс, в порядке вложенности

Задача 4
Разработать пользовательский интерфейс:

- дерево категорий
- страница одной категории с отображением списка рецептов и статей для категории, а также списка родительских категорий (breadcrumbs)
- страница с содержанием статьи или рецепта, а также списком родительских категорий (breadcrumbs)
- по идентификатору статьи или рецепта возвращает полный перечень категорий, к которым относится указанный ресурс, в порядке вложенности
- все страницы должны иметь уникальный адрес и быть доступны по прямой ссылке
