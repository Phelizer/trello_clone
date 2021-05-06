import { Injectable, NotFoundException } from '@nestjs/common';
import { Section } from './section.model';
import { pool } from '../dbPool';

@Injectable()
export class SectionsService {
  boardsToSections = {};

  async addSection(name: string, boardID: number): Promise<Section[]> {
    // // generating a pseudo id
    // const id = Math.floor(Math.random() * (100000 - 0)) + 0;
    const existingSections = await this.getAllSections(boardID);

    // position calculating
    let maxPos = -1;
    existingSections.forEach((sec) => {
      if (sec.position > maxPos) maxPos = sec.position;
    });
    const position = maxPos + 1;

    // adding new section

    await pool.query(
      'INSERT INTO sections (section_name, position, board_id) VALUES ($1, $2, $3)',
      [name, position, boardID],
    );

    const sections = await this.getAllSections(boardID);
    // const section = new Section(name, id, position);
    // if (!this.boardsToSections[boardID]) this.boardsToSections[boardID] = [];
    // this.boardsToSections[boardID].push(section);

    return sections;
  }

  async getAllSections(boardID: number): Promise<Section[]> {
    const sectionData = await pool.query(
      'SELECT section_id, section_name, position FROM SECTIONS WHERE board_id = $1',
      [boardID],
    );

    const classlessSections = sectionData.rows;
    const sections = this.convertToSections(classlessSections);

    return sections;
  }

  removeSection(boardID: number, sectionID: number): Section[] {
    // error handling
    if (!this.sectionExists(boardID, sectionID))
      throw new NotFoundException('Could not find section with such ID');

    const deletedSec = this.boardsToSections[boardID].find(
      (sec: Section) => sec.id === sectionID,
    );

    const deletedPos = deletedSec.position;

    const sectionsToUpdate = this.boardsToSections[boardID].filter(
      (sec: Section) => sec.position > deletedPos,
    );

    // updating positions of all the affected sections
    for (const sec of sectionsToUpdate) sec.position--;

    // deleting the section
    this.boardsToSections[boardID] = this.boardsToSections[boardID].filter(
      (sec: Section) => sec.id !== sectionID,
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
      (sec: Section) => sec.id === sectionID,
    );

    const currPos = searchedSection.position;

    // finding all the sections
    // which positions should be changed
    const sectionsToUpdate = this.boardsToSections[boardID].filter(
      (sec: Section) =>
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
      (sec: Section) => sec.id === sectionID,
    );
    return searchedSection ? true : false;
  }

  // this function checks it there is a board in DB
  // with such id
  boardExists(boardID: number): boolean {
    return this.boardsToSections[boardID] ? true : false;
  }

  convertToSections(sectionArr): Array<Section> {
    const sections = sectionArr.map(
      (sec) => new Section(sec.section_name, sec.section_id, sec.position),
    );

    return sections;
  }
}
