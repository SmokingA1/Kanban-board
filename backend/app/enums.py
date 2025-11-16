from enum import Enum as PyEnum

class UserRoleEnum(str, PyEnum):
    ADMIN = "admin"
    USER = "user"

