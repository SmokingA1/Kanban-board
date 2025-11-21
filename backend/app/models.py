from uuid import uuid4, UUID as PyUUID
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import ForeignKey, String, Integer, Boolean, Enum, Text, PrimaryKeyConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID as PG_UUID


from app.enums import UserRoleEnum, ProjectVisibilityEnum, ColumnStatusEnum, TaskPriorityEnum, PParticipantRoleEnum
from app.core.database import Base, TimestampMixin, TZDateTime


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    username: Mapped[str] = mapped_column(String(50), nullable=False, index=True, unique=True)
    full_name: Mapped[str] = mapped_column(String(50), nullable=True)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True, unique=True)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    phone_number: Mapped[str] = mapped_column(String(15), nullable=True, index=True, unique=True)
    avatar_url: Mapped[str] = mapped_column(String(255), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    role: Mapped[UserRoleEnum] = mapped_column(Enum(UserRoleEnum), nullable=False, default=UserRoleEnum.USER)

    own_projects: Mapped[list["Project"]] = relationship(back_populates="owner", cascade="delete-orphan") #own projects what user had created
    projects: Mapped[list["ProjectParticipant"]] = relationship(back_populates="user", cascade="delete-orphan") # projects when user is participant
    tasks: Mapped[list["TaskAssignment"]] = relationship(back_populates="assignee", cascade="delete-orphan")
    created_tasks: Mapped[list["Task"]] = relationship(back_populates="creator", cascade="delete-orphan")
    comments: Mapped[list["Comment"]] = relationship(back_populates="user", cascade="delete-orphan")

    def __repr__(self):
        return f"<User(id='{self.id}', username='{self.username}', email='{self.email}')>"


class Project(Base, TimestampMixin):
    __tablename__ = "projects"
    
    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    owner_id: Mapped[PyUUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE", name="fk_projects_users_id"))
    name: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    visibility: Mapped[ProjectVisibilityEnum] = mapped_column(Enum(ProjectVisibilityEnum, name="projectvisibility"), nullable=False, default=ProjectVisibilityEnum.PUBLIC) 

    owner: Mapped["User"] = relationship(back_populates="own_projects")
    participants: Mapped[list["ProjectParticipant"]] = relationship(back_populates="project", cascade="delete-orphan")
    boards: Mapped[list["Board"]] = relationship(back_populates="project", cascade="delete-orphan")

    def __repr__(self):
        return f"<Project(id='{self.id}', name='{self.name}')>"


class ProjectParticipant(Base, TimestampMixin):
    __tablename__ = "project_participants"

    project_id: Mapped[PyUUID] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE", name="fk_project_participants_projects_id"), nullable=False, index=True)
    user_id: Mapped[PyUUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE", name="fk_project_participants_users_id"), nullable=False, index=True)
    joined_at: Mapped[datetime] = mapped_column(TZDateTime(), default=datetime.now(timezone.utc))
    role: Mapped [PParticipantRoleEnum] = mapped_column(Enum(PParticipantRoleEnum, name="pparticipantrole"), nullable=False, default=PParticipantRoleEnum.USER)

    project: Mapped["Project"] = relationship(back_populates="participants")
    user: Mapped["User"] = relationship(back_populates="projects")

    __table_args__ = (
        PrimaryKeyConstraint("user_id", "project_id")
    )

    def __repr__(self):
        return f"<ProjectParticipant(project_id='{self.project_id}', user_id='{self.user_id}')>"


class Board(Base, TimestampMixin):
    __tablename__ = "boards"

    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    project_id: Mapped[PyUUID] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE", name="fk_boards_projects_id"), nullable=False)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    
    project: Mapped["Project"] = relationship(back_populates="boards")
    columns: Mapped[list["Column"]] = relationship(back_populates="board", cascade="delete-orphan")

    def __repr__(self):
        return f"<Board(id='{self.id}', project_id='{self.project_id}', name='{self.name}')>"


class Column(Base, TimestampMixin):
    __tablename__ = "columns"

    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    board_id: Mapped[PyUUID] = mapped_column(ForeignKey("boards.id", ondelete="CASCADE", name="fk_columns_boards_id"), nullable=False)
    name: Mapped[str] = mapped_column(String(25), nullable=False)
    order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    status: Mapped[ColumnStatusEnum] = mapped_column(Enum(ColumnStatusEnum), nullable=False, default=ColumnStatusEnum.TO_DO)
    wip_limit: Mapped[int | None] = mapped_column(Integer, nullable=True)

    board: Mapped["Board"] = relationship(back_populates="columns")
    tasks: Mapped[list["Task"]] = relationship(back_populates="column", cascade="delete-orphan")
    
    def __repr__(self):
        return f"<Column(id='{self.id}', board_id='{self.board_id}', name='{self.name}')>"


class Task(Base, TimestampMixin):
    __tablename__ = "tasks"

    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    column_id: Mapped[PyUUID] = mapped_column(ForeignKey("columns.id", ondelete="CASCADE", name="fk_tasks_columns_id"), nullable=False)
    created_by: Mapped[PyUUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE", name="fk_tasks_users_id"))
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)
    priority: Mapped[TaskPriorityEnum] = mapped_column(Enum(TaskPriorityEnum), nullable=False, default=TaskPriorityEnum.LOW)
    order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    due_date: Mapped[datetime] = mapped_column(TZDateTime(), nullable=False)
    completed_at: Mapped[datetime | None] = mapped_column(TZDateTime(), nullable=True)

    column: Mapped["Column"] = relationship(back_populates="tasks")
    creator: Mapped["User"] = relationship(back_populates="created_tasks")
    assignments: Mapped[list["TaskAssignment"]] = relationship(back_populates="task", cascade="delete-orphan")
    comments: Mapped[list["Comment"]] = relationship(back_populates="task", cascade="delete-orphan")

    def __repr__(self):
        return f"<Task(id='{self.id}', column_id='{self.column_id}', name='{self.name}', priority='{self.priority}')>"


class TaskAssignment(Base):
    __tablename__ = "task_assignments"

    task_id: Mapped[PyUUID] = mapped_column(ForeignKey("tasks.id", ondelete="CASCADE", name="fk_task_assignments_tasks_id"), nullable=False)
    assignee_id: Mapped[PyUUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE", name="fk_task_assignments_users_id"), nullable=False)
    assigned_at: Mapped[datetime] = mapped_column(TZDateTime(), default=datetime.now(timezone.utc))

    assignee: Mapped["User"] = relationship(back_populates="tasks")
    task: Mapped["Task"] = relationship(back_populates="assignments")

    __table_args__ = (
        PrimaryKeyConstraint("task_id", "assignee_id")
    )

    def __repr__(self):
        return f"<TaskAssignment(task_id='{self.task_id}', assigned_id='{self.assignee_id}')>"


class Comment(Base, TimestampMixin):
    __tablename__ = "comments"

    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    task_id: Mapped[PyUUID] = mapped_column(ForeignKey("tasks.id", ondelete="CASCADE", name="fk_comments_tasks_id"), nullable=False)
    user_id: Mapped[PyUUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE", name="fk_comments_users_id"), nullable=False)
    content: Mapped[str] = mapped_column(Text)

    parent_id: Mapped[PyUUID | None] = mapped_column(ForeignKey("comments.id", name="fk_comments_comments_id"), nullable=True)

    task: Mapped["Task"] = relationship(back_populates="comments")
    user: Mapped["User"] = relationship(back_populates="comments")
    children: Mapped[list["Comment"]] = relationship(back_populates="parent", cascade="all, delete-orphan")
    parent: Mapped[Optional["Comment"]] = relationship(
        back_populates="children",
        remote_side=[id],
        uselist=False
    )


# class Attachment(Base, TimestampMixin):
#     __tablename__ = "attachments" 

#     id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)