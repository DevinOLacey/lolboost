steps = [
    [
        """
            CREATE TABLE accounts (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                hash_password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                riot_id VARCHAR(255) NOT NULL,
                u_gg TEXT NOT NULL
                );
        """,
        """
            DROP TABLE accounts;
        """,
    ],
]
