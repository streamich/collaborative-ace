import type {Ace} from "ace-builds";
import type {SimpleChange, EditorFacade} from 'collaborative-editor';

export class AceEditorFacade implements EditorFacade {
  public onchange?: (changes: SimpleChange[] | void) => void;
  public onselection?: () => void;

  constructor(protected readonly editor: Ace.Editor) {
    editor.on('change', this.onChange);
  }

  private readonly onChange = (delta: Ace.Delta) => {
    if (delta && typeof delta == 'object' && delta.start && delta.end) {
      const doc = this.editor.getSession().getDocument();
      const start = doc.positionToIndex(delta.start);
      const text = delta.lines.join('\n');
      switch (delta.action) {
        case 'insert':
          // console.log([start, 0, text]);
          this.onchange?.([[start, 0, text]]);
          break;
        case 'remove':
          // console.log([start, text.length, '']);
          this.onchange?.([[start, text.length, '']]);
          break;
        default:
          this.onchange?.();
      }
    } else this.onchange?.();
  };

  public get(): string {
    return this.editor.getValue();
  }

  // If there is no dedicated method for getting the length of the text, then
  // better not to implement this method at all.
  // public getLength(): number {
  //   return this.editor.getValue().length;
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

  public dispose(): void {
    this.editor.off('change', this.onChange);
  }
}
