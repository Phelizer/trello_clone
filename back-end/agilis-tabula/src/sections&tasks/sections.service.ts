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
    const searchedSection = await pool.query(
      'SELECT position FROM sections WHERE section_id = $1',
      [sectionID],
    );

    const currPos = searchedSection.rows[0].position;
    console.log(currPos);

    // fixing positions
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

    return sections;
  }

  convertToSections(sectionArr): Array<Section> {
    const sections = sectionArr.map(
      (sec) => new Section(sec.section_name, sec.section_id, sec.position),
    );

    return sections;
  }
}
