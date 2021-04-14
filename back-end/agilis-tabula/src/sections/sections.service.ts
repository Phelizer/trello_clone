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
    return this.boardsToSections[boardID];
  }

  removeSection(boardID: number, sectionID: number): Section[] {
    // error handling
    const searchedSection = this.boardsToSections[boardID].find(
      (board) => board.id === sectionID,
    );
    if (!searchedSection) {
      throw new NotFoundException('Could not find section with such ID');
    }

    this.boardsToSections[boardID] = this.boardsToSections[boardID].filter(
      (sec) => sec.id !== sectionID,
    );

    return this.boardsToSections[boardID];
  }
}
