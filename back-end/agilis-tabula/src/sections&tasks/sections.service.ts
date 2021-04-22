import { Injectable, NotFoundException } from '@nestjs/common';
import { Section } from './section.model';

@Injectable()
export class SectionsService {
  boardsToSections = {};

  addSection(name: string, boardID: number): Section[] {
    // generating a pseudo id
    const id = Math.floor(Math.random() * (100000 - 0)) + 0;

    // position calculating
    let maxPos = -1;
    if (this.boardsToSections[boardID]) {
      this.boardsToSections[boardID].forEach((sec) => {
        if (sec.position > maxPos) maxPos = sec.position;
      });
    }
    const position = maxPos + 1;

    // adding new section
    const section = new Section(name, id, position);
    if (!this.boardsToSections[boardID]) this.boardsToSections[boardID] = [];
    this.boardsToSections[boardID].push(section);

    return this.boardsToSections[boardID];
  }

  getAllSections(boardID: number): Section[] {
    const sections = this.boardsToSections[boardID];
    return sections ? sections : [];
  }

  removeSection(boardID: number, sectionID: number): Section[] {
    // error handling
    if (!this.sectionExists(boardID, sectionID))
      throw new NotFoundException('Could not find section with such ID');

    this.boardsToSections[boardID] = this.boardsToSections[boardID].filter(
      (sec) => sec.id !== sectionID,
    );

    return this.boardsToSections[boardID];
  }

  changePosition(
    boardID: number,
    sectionID: number,
    newPos: number,
  ): Section[] {
    // error handling
    if (!this.sectionExists(boardID, sectionID))
      throw new NotFoundException('Could not find section with such ID');

    const searchedSection = this.boardsToSections[boardID].find(
      (sec) => sec.id === sectionID,
    );

    const currPos = searchedSection.position;

    // finding all the sections
    // which positions should be changed
    const sectionsToUpdate = this.boardsToSections[boardID].filter(
      (sec) =>
        (sec.position >= newPos && sec.position < currPos) ||
        (sec.position <= newPos && sec.position > currPos),
    );

    // updating positions of affected sections
    for (const sec of sectionsToUpdate) {
      switch (newPos < currPos) {
        case true:
          sec.position++;
          break;
        case false:
          sec.position--;
          break;
      }
    }

    searchedSection.position = newPos;
    return this.boardsToSections[boardID];
  }

  // error handling utils

  // this function checks it there is a section in DB
  // with such id
  sectionExists(boardID: number, sectionID: number): boolean {
    if (!this.boardExists(boardID))
      throw new NotFoundException('Could not find board with such ID');

    const searchedSection = this.boardsToSections[boardID].find(
      (sec) => sec.id === sectionID,
    );
    return searchedSection ? true : false;
  }

  // this function checks it there is a board in DB
  // with such id
  boardExists(boardID: number): boolean {
    return this.boardsToSections[boardID] ? true : false;
  }
}
