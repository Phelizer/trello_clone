export class Task {
  constructor(
    public name: string,
    public id: number,
    public section: number,
    public priority: number,
    public timestamp: number,
    public executorIDArr: Array<number>,
  ) {}
}
