import type {Ace} from "ace-builds";
import type {SimpleChange, EditorFacade} from 'collaborative-editor';

export class AceEditorFacade implements EditorFacade {
  public onchange?: (changes: SimpleChange[] | void) => void;
  public onselection?: () => void;

  constructor(protected readonly editor: Ace.Editor) {}

  public get(): string {
    return this.editor.getValue();
  }

  // public getLength(): number {
  //   throw new Error('Method not implemented.');
  // }

  public set(text: string): void {
    this.editor.setValue(text);
  }

  // public ins(from: number, insert: string): void {
  //   throw new Error('Method not implemented.');
  // }

  // public del(from: number, length: number): void {
  //   throw new Error('Method not implemented.');
  // }

  // public getSelection(): [number, number, -1 | 0 | 1] | null {
  //   throw new Error('Method not implemented.');
  // }

  // public setSelection(start: number, end: number, direction: -1 | 0 | 1): void {
  //   throw new Error('Method not implemented.');
  // }

  // public dispose(): void {
  //   throw new Error('Method not implemented.');
  // }
}
