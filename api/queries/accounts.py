from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional
from fastapi import HTTPException
from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional
from fastapi import HTTPException

# from PIL import Image
# import secrets


class UserOut(BaseModel):
    id: int
    username: str
    riot_id: str
    u_gg: str


class UserUpdateIn(BaseModel):
    riot_id: Optional[str] = None
    u_gg: Optional[str] = None


class UserProfileOut(BaseModel):
    id: int
    email: str
    riot_id: str
    u_gg: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class DuplicateAccountError(ValueError):
    pass


class Error(BaseModel):
    message: str


class UserIn(BaseModel):
    username: str
    password: str
    password_confirmation: str
    riot_id: str
    u_gg: str


class AccountsRepository(BaseModel):
    def create_account(self, users: UserIn, hashed_password: str) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO accounts
                            (email, hash_password, riot_id, u_gg)
                        VALUES
                            (%s,%s,%s,%s)
                        RETURNING id;
                        """,
                        [
                            users.username.lower(),
                            hashed_password,
                            users.riot_id,
                            users.u_gg,
                        ],
                    )
                    user_id = result.fetchone()[0]
                    return UserOutWithPassword(
                        id=user_id,
                        username=users.username,
                        riot_id=users.riot_id,
                        u_gg=users.u_gg,
                        hashed_password=hashed_password,
                    )
        except Exception as e:
            print(e)
            raise DuplicateAccountError from e

    def get_all_accounts(self) -> Union[List[UserOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, email, riot_id, u_gg
                        FROM accounts;
                        """
                    )
                    print
                    return [self.record_to_user_out(record) for record in result]
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=400, detail="Could not fetch accounts"
            ) from e

    def record_to_user_out(self, record):
        return UserOut(
            id=record[0],
            username=record[1],
            riot_id=record[2],
            u_gg=record[3],
        )

    def get_account(self, email: str) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                            SELECT id, email, riot_id, u_gg, hash_password
                            FROM accounts
                            WHERE email = %s;
                            """,
                        [email.lower()],
                    )
                    record = db.fetchone()
                    if record is None:
                        return "fuck"
                    return UserOutWithPassword(
                        id=record[0],
                        username=record[1],
                        riot_id=record[2],
                        u_gg=record[3],
                        hashed_password=record[4],
                    )

        except Exception as e:
            print(e)
            return {"message": "Account not found"}
