from fastapi import (
    Depends,
    HTTPException,
    # status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.accounts import (
    UserIn,
    UserOut,
    # UserUpdateIn,
    AccountsRepository,
    DuplicateAccountError,
    Error,
    # UserProfileOut,
    UserOutWithPassword,
)

from typing import Union, List


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: UserOut


class UserAccount(BaseModel):
    id: int


class EmailOut(BaseModel):
    email: str


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    repo: AccountsRepository = Depends(),
):
    if info.password != info.password_confirmation:
        raise HTTPException(
            status_code=400,
            detail="Passwords do not match",
        )
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create_account(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=400,
            detail="An Account already exists with these credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.get("/accounts", response_model=Union[Error, List[UserOut]])
def get_accounts(
    repo: AccountsRepository = Depends(),
):
    return repo.get_all_accounts()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.get("/account", response_model=Union[Error, UserOutWithPassword])
def get_account(
    email: str,
    repo: AccountsRepository = Depends(),
):
    result = repo.get_account(email)
    if result == "fuck":
        raise HTTPException(status_code=404, detail="Account not found")
    return result
