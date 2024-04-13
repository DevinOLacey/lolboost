from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from fastapi import (
    Depends,
    HTTPException,
    # status,
    Response,
    APIRouter,
    Request,
)
from typing import Union, List
from queries.orders import OrderOut
from routers.accounts import HttpError

@router.post("/orders", response_model=OrderOut | HttpError)
