module.exports = ({ env }) => ({
	connection: {
		client: 'postgres',
		connection: {
			connectionString: env('DATABASE_URL'),
			host: env('PGHOST', 'viaduct.proxy.rlwy.net'),
			port: env.int('PGPORT', 24416),
			database: env('PGDATABASE', 'railway'),
			user: env('PGUSER', 'postgres'),
			password: env('POSTGRES_PASSWORD', '23bAAE2aC3ed2F4d41eAF34G12C6EDDC'),
			ssl: env.bool(true),
		},
		pool: { min: 0 }
	},
});