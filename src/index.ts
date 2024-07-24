import {StrBinding} from 'collaborative-editor';
import {AceEditorFacade} from './AceEditorFacade';
import type {Ace} from 'ace-builds';
import type {CollaborativeStr} from 'collaborative-editor';

export const bind = (str: () => CollaborativeStr, editor: Ace.Editor, polling?: boolean): (() => void) =>
  StrBinding.bind(str, new AceEditorFacade(editor), polling);
