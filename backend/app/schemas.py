from uuid import UUID
from datetime import datetime

from pydantic import BaseModel, Field, EmailStr
from app.enums import (
    UserRoleEnum,
    ProjectVisibilityEnum,
    PParticipantRoleEnum,
    ColumnStatusEnum,
    TaskStatusEnum,
    TaskPriorityEnum,
)

#User
class UserBase(BaseModel):
    username: str = Field(..., min_length=1, max_length=50)
    full_name: str = Field(..., min_length=1, max_length=50)
    email: EmailStr = Field(...)
    phone_number: str | None = Field(None, min_length=10, max_length=15)
    avatar_url: str | None = Field(None, min_length=1, max_length=255)
    role: UserRoleEnum = Field(UserRoleEnum.USER)


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=50)


class UserRead(UserBase):
    id: UUID 
    is_active: bool
    is_verified: bool
    created_at: datetime
    updated_at: datetime

    model_config = {'from_attributes': True}


class UserUpdate(BaseModel):
    username: str | None = Field(None, min_length=1, max_length=50)
    full_name: str | None = Field(None, min_length=1, max_length=50)
    email: EmailStr | None = Field(None)
    phone_number: str | None = Field(None, min_length=10, max_length=15)
    is_active: bool | None = Field(None)

#Project
class ProjectBase(BaseModel):
    owner_id: UUID = Field(...)
    name: str = Field(..., min_length=1, max_length=50)
    description: str = Field(..., min_length=1, max_length=1000)
    visibility: ProjectVisibilityEnum = Field(ProjectVisibilityEnum.PUBLIC)


class ProjectCreate(ProjectBase):
    pass


class ProjectRead(ProjectBase):
    id: UUID

    model_config = {"from_attributes": True}


class ProjectUpdate(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=50)
    description: str | None = Field(None, min_length=1, max_length=1000)
    visibility: ProjectVisibilityEnum | None = Field(None)

#Board
class ProjectParticipantBase(BaseModel):
    project_id: UUID = Field(...)
    user_id: UUID = Field(...)
    role: PParticipantRoleEnum = Field(...)


class ProjectParticipantCreate(ProjectParticipantBase):
    pass 


class ProjectParticipantRead(ProjectParticipantBase):
    joined_at: datetime

    model_config = {'from_attributes': True}


class ProjectParticipantReadP(ProjectParticipantRead):
    project: ProjectRead


class ProjectParticipantReadU(ProjectParticipantRead):
    user: UserRead


class ProjectParticipantUpdate(BaseModel):
    role: PParticipantRoleEnum | None = Field(None)

#Board
class BoardBase(BaseModel):
    project_id: UUID = Field(...)
    name: str = Field(..., min_length=1, max_length=50)


class BoardCreate(BoardBase):
    pass 


class BoardRead(BoardBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {'from_attributes': True}


class BoardUpdate(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=50)

#Column
class ColumnBase(BaseModel):
    board_id: UUID = Field(...)
    name: str = Field(..., min_length=1, max_length=25)
    order: int = Field(..., ge=0)
    status: ColumnStatusEnum = Field(ColumnStatusEnum.TO_DO)
    wip_limit: int | None = Field(None, ge=1)


class ColumnCreate(ColumnBase):
    pass 


class ColumnRead(ColumnBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ColumnUpdate(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=25)
    
#Task
class TaskBase(BaseModel):
    column_id: UUID = Field(...)
    created_by: UUID = Field(...)
    name: str = Field(..., min_length=1, max_length=50)
    description: str = Field(..., min_length=1, max_length=1000)
    status: TaskStatusEnum = Field(TaskStatusEnum.TO_DO)
    priority: TaskPriorityEnum = Field(TaskPriorityEnum.LOW)
    order: int = Field(..., ge=0)
    due_date: datetime = Field(...)
    completed_at: datetime | None = Field(None)


class TaskCreate(TaskBase):
    pass 


class TaskRead(TaskBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class TaskUpdate(BaseModel):
    column_id: UUID | None = Field(None)
    name: str | None = Field(None, min_length=1, max_length=50)
    description: str | None = Field(None, min_length=1, max_length=1000)
    status: TaskStatusEnum | None = Field(None)
    priority: TaskPriorityEnum | None = Field(None)
    order: int = Field(None, ge=0)
    due_date: datetime | None= Field(None)
    completed_at: datetime | None = Field(None)

#TaskParticipant
class TaskAssignmentBase(BaseModel):
    task_id: UUID = Field(...)
    assignee_id: UUID = Field(...)
    

class TaskAssignmentCreate(TaskAssignmentBase):
    pass 


class TaskAssignmentRead(TaskAssignmentBase):
    assigned_at: datetime

    model_config = {"from_attributes": True}


class TaskAssignmentTaskRead(TaskAssignmentRead):
    task: TaskRead


class TaskAssignmentAssigneeRead(TaskAssignmentRead):
    assignee: UserRead

#Comment
class CommentBase(BaseModel):
    task_id: UUID = Field(...)
    user_id: UUID = Field(...)
    parent_id: UUID | None = Field(None)
    content: str = Field(..., min_length=1, max_length=1000)


class CommentCreate(CommentBase):
    pass 


class CommentRead(CommentBase):
    id: UUID 
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class CommentUpdate(BaseModel):
    content: str | None = Field(None, min_length=1, max_length=500)

