# Node API

1. Make sure MySQL is installed and running on the system. Create a `node` table and run the query:

```sql
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT '',
  `email` varchar(50) DEFAULT '',
  `username` varchar(50) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

2. Clone, install, and start up the app.

```bash
git clone https://github.com/taniarascia/node-api.git
npm install
node app.js
```

Navigate to http://localhost:3001

3. Send a POST request through

```
node post.js
```
