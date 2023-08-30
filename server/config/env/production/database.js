module.exports = ({ env }) => ({
	connection: {
	  client: 'postgres',
	  connection: {
		connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'containers-us-west-95.railway.app'),
        port: env.int('DATABASE_PORT', 6823),
        database: env('DATABASE_NAME', 'railway'),
        user: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', '17sVqjIvdShTZg8krYEz'),
		ssl: env.bool(true),
	  },
	  pool: { min: 0 }
	},
  });