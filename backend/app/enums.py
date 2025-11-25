from enum import Enum as PyEnum

class UserRoleEnum(str, PyEnum):
    ADMIN = "admin"
    USER = "user"


class ProjectVisibilityEnum(str, PyEnum):
    PUBLIC = "public"
    PRIVATE = "private"


class TaskStatusEnum(str, PyEnum):
    BACKLOG = "backlog"
    TO_DO = "to_do"
    IN_RPOGRESS = "in_progress"
    TESTING = "testing"
    DONE = "done"


class ColumnStatusEnum(str, PyEnum):
    BACKLOG = "backlog"
    TO_DO = "to_do"
    IN_RPOGRESS = "in_progress"
    TESTING = "testing"
    DONE = "done"


class TaskPriorityEnum(str, PyEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class PParticipantRoleEnum(str, PyEnum):
    USER = "user"
    ADMIN = "admin"
    MODERATOR = "moderator"
    