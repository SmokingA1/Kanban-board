from uuid import UUID
from typing import List

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models import Board
from app.schemas import BoardCreate, BoardUpdate

async def get_board_by_id(*, db: AsyncSession, board_id: UUID) -> Board | None:
    db_baord = await db.get(Board, board_id)
    return db_baord


async def get_boards(
    *,
    db: AsyncSession,
    page: int = 1,
    limit: int = 20,
) -> List[Board]:
    query = select(Board).order_by(Board.created_at)
    offset = (page - 1) * limit
    query = query.offset(offset).limit(limit)
    
    db_board = await db.execute(query)
    return db_board.scalars().all()


async def get_boards_by_project_id(
    *,
    db: AsyncSession,
    project_id: UUID,
) -> List[Board]:
    query = select(Board).where(Board.project_id == project_id)

    db_boards = await db.execute(query)
    return db_boards


async def create_board(
    *,
    db: AsyncSession,
    board_create: BoardCreate,
) -> Board | None:
    new_board = Board(**board_create.model_dump())

    db.add(new_board)
    await db.commit()
    await db.refresh(new_board)

    return new_board


async def update_board_by_id(
    *,
    db: AsyncSession,
    board_id: UUID,
    board_update: BoardUpdate,
) -> Board | None:
    db_board = await get_board_by_id(db=db, board_id=board_id)

    if not db_board:
        return None
    
    update_data = board_update.model_dump(exclude_unset=True)
    for k, v in update_data.items():
        if v is not None:
            setattr(db_board, k, v)

    await db.commit()
    await db.refresh(db_board)

    return db_board


async def delete_board_by_id(
    *,
    db: AsyncSession,
    board_id: UUID,
) -> Board | None:
    db_board = await get_board_by_id(db=db, board_id=board_id)

    if not db_board:
        return None
    
    await db.delete(db_board)
    await db.commit()

    return db_board
    