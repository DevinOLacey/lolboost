from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional
from fastapi import HTTPException


class OrderOut(BaseModel):
    id: int
    account_id: int
    queue_type: str
    boost_type: str
    order_date: str
    order_time: str
    order_region: str
    order_price: float
