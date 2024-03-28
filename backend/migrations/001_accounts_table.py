steps = [
    [
        """
    CREATE TABLE users (
        user_id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR NOT NULL UNIQUE,
        email VARCHAR UNIQUE,
        hashed_password VARCHAR NOT NULL,
        riot_tag VARCHAR,
        ugg TEXT,
    );
    """,
        """
    DROP TABLE users;
    """,
    ]
]
