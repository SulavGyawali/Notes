from typing import List
from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/notes",
    tags=["notes"]
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.Note)
async def create_notes(note: schemas.NoteCreate, db : Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    new_note = models.Notes(**note.model_dump())
    print(new_note)
    new_note.user_id = current_user.id
    new_note.author = current_user.username
    new_note.title = note.title
    new_note.description = note.description
    print(new_note)
    db.add(new_note)
    db.commit()
    db.refresh(new_note)
    return new_note


@router.get("/", response_model=List[schemas.Note])
async def read_notes(db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    notes = db.query(models.Notes).filter(models.Notes.user_id == current_user.id).all()
    if notes is []:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No notes found")
    return notes

@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_note(note_id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    note = db.query(models.Notes).filter(models.Notes.id == note_id).first()
    if note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    if note.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this note")
    db.delete(note)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.put("/{note_id}", response_model=schemas.Note)
async def update_notes(note_id: int, new_note: schemas.NoteCreate, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
    note_query = db.query(models.Notes).filter(models.Notes.id == note_id)
    if note_query.first() is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    if note_query.first().user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this note")
    if note_query.first().author != current_user.username:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this note")
    note_query.update(new_note.model_dump())

    db.commit()
    return note_query.first()