import {StrBinding} from 'collaborative-editor';
import {AceEditorFacade} from './AceEditorFacade';
import type {Ace} from 'ace-builds';
import type {StrApi} from 'json-joy/es2020/json-crdt';

export const bind = (str: StrApi, editor: Ace.Editor, polling?: boolean): (() => void) =>
  StrBinding.bind(str, new AceEditorFacade(editor), polling);
