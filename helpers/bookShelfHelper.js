/*Book-shelf:: to make connection string with MySQL*/
const localServer = {
   hostname: 'localhost',
   dbuser: 'root',
   password: 'Root',
   database: 'miniclick'
};

var knex = require('knex')({
	client: 'mysql',
	connection: {
		host: localServer.hostname,
		user: localServer.dbuser,
		password: localServer.password,
		database: localServer.database,
		charset: 'utf8mb4'
	}
});

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
