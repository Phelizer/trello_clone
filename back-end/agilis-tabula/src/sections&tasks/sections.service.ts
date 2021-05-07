import { Injectable, NotFoundException } from '@nestjs/common';
import { Section } from './section.model';
import { pool } from '../dbPool';

@Injectable()
export class SectionsService {
  boardsToSections = {};

  async addSection(name: string, boardID: number): Promise<Section[]> {
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

  async removeSection(boardID: number, sectionID: number): Promise<Section[]> {
    const deletedPosData = await pool.query(
      'SELECT position FROM sections WHERE section_id = $1',
      [sectionID],
    );
    const deletedPos = deletedPosData.rows[0].position;
    await pool.query('DELETE FROM sections WHERE section_id = $1', [sectionID]);
    await pool.query('SELECT fixSectionPositions($1, $2)', [
      boardID,
      deletedPos,
    ]);
    const sections = await this.getAllSections(boardID);

    return sections;
  }

  async changePosition(
    boardID: number,
    sectionID: number,
    newPos: number,
  ): Promise<Section[]> {
    // // error handling
    // if (!this.sectionExists(boardID, sectionID))
    //   throw new NotFoundException('Could not find section with such ID');

    // const searchedSection = this.boardsToSections[boardID].find(
    //   (sec: Section) => sec.id === sectionID,
    // );

    const searchedSection = await pool.query(
      'SELECT position FROM sections WHERE section_id = $1',
      [sectionID],
    );

    const currPos = searchedSection.rows[0].position;
    console.log(currPos);

    await pool.query(
      'UPDATE sections SET position = position + 1 WHERE position >= $1 AND position < $2 AND board_id = $3;',
      [newPos, currPos, boardID],
    );
    await pool.query(
      'UPDATE sections SET position = position - 1 WHERE position <= $1 AND position > $2 AND board_id = $3;',
      [newPos, currPos, boardID],
    );
    await pool.query(
      'UPDATE sections SET position = $1 WHERE section_id = $2 AND board_id = $3',
      [newPos, sectionID, boardID],
    );
    const sections = await this.getAllSections(boardID);
    // // finding all the sections
    // // which positions should be changed
    // const sectionsToUpdate = this.boardsToSections[boardID].filter(
    //   (sec: Section) =>
    //     (sec.position >= newPos && sec.position < currPos) ||
    //     (sec.position <= newPos && sec.position > currPos),
    // );

    // // updating positions of affected sections
    // for (const sec of sectionsToUpdate) {
    //   switch (newPos < currPos) {
    //     case true:
    //       sec.position++;
    //       break;
    //     case false:
    //       sec.position--;
    //       break;
    //   }
    // }

    // searchedSection.position = newPos;
    return sections;
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
