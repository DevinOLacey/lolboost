from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional
from fastapi import HTTPException


class OrderOut(BaseModel):
    id: int
    account_id: int
    queue_type: str
    boost_type: str
    current_tier: str
    current_division: int
    desired_tier: str
    desired_division: str
    current_lp: int
    order_date: str
    order_time: str
    order_region: str
    order_price: float

class OrderIn(BaseModel):
    queue_type: str
    boost_type: str
    order_date: str
    order_time: str
    order_region: str
    order_price: float

class DuplicateOrderError(ValueError):
    pass

class OrdersRepository(BaseModel):
    def create_order(self, order: OrderIn) -> OrderOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO orders
                            ()
                        VALUES
                            ()
                        RETURNING id;
                        """,
                        [
                            
                        ],
                    )
                    order_id = result.fetchone()[0]
                    return OrderOut(
                        id=order_id,
                    )
        except Exception as e:
            print(e)
            raise DuplicateOrderError from e