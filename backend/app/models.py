from uuid import uuid4, UUID as PyUUID

from sqlalchemy import ForeignKey, String, Integer, Boolean, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID as PG_UUID

from app.enums import UserRoleEnum
from app.core.database import Base, TimestampMixin

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


    def __repr__(self):
        return f"<User(id='{self.id}', username='{self.username}', email='{self.email}')>"


class Project(Base, TimestampMixin):
    __tablename__ = "projects"
    
    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    owner_id: Mapped[PyUUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE", name="fk_projects_users_id"))
    description: Mapped[str] = mapped_column(String(255), nullable=True)

    owner: Mapped["User"] = relationship(back_populates="own_projects")

    def __repr__(self):
        return f"<Project(id='{self.id}', name='{self.username}')>"



class ProjectParticipant(Base, TimestampMixin):
    __tablename__ = "project_participants"

    project_id: Mapped[PyUUID] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE", name="fk_project_participants_users_id"), nullable=False, index=True)
    user_id: Mapped[PyUUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE", name="fk_users_participants_users_id"), nullable=False, index=True)


class Board(Base, TimestampMixin):
    __tablename__ = "boards"

    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)



class Column(Base, TimestampMixin):
    __tablename__ = "columns"

    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)



class Task(Base, TimestampMixin):
    __tablename__ = "tasks"

    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)


class TaskAssignment(Base):
    __tablename__ = "task_assignments"

    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)


class Comment(Base, TimestampMixin):
    __tablename__ = "comments"

    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)


class Attachment(Base, TimestampMixin):
    __tablename__ = "attachments" 

    id: Mapped[PyUUID] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)