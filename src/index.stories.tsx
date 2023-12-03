import * as React from 'react';
import {Model} from 'json-joy/es2020/json-crdt';
import AceEditor from 'react-ace';
import {bind} from '.';
import type {Ace} from 'ace-builds';
import type {Meta, StoryObj} from '@storybook/react';

interface EditorProps {
  src: string;
}

const Editor: React.FC<EditorProps> = ({src = ''}) => {
  const editorRef = React.useRef<Ace.Editor>(null);
  const unbindRef = React.useRef<() => void>(null);
  const [model, clone] = React.useMemo(() => {
    const model = Model.withLogicalClock();
    model.api.root(src);
    return [model, model.clone()];
  }, []);
  React.useSyncExternalStore(model.api.subscribe, () => model.tick);
  React.useEffect(() => {
    return () => {
      unbindRef.current?.();
    };
  }, []);

  const insert = (text: string, position?: number) => {
    const editor = editorRef.current;
    if (!editor) return;
    const session = editor.session;
    const doc = session.doc;
    const pos = position ?? editor.getValue().length;
    const docPos = doc.indexToPosition(pos, 0);
    session.insert(docPos, text);
  };

  return (
    <div>
      <AceEditor
        onLoad={(editor: Ace.Editor) => {
          (editorRef.current as any) = editor;
          (unbindRef.current as any) = bind(model.api.str([]), editor, true);
        }}
      />
      <div>
        <button onClick={() => insert('!')}>Append "!" to editor</button>
      </div>
      <div>
        <button
          onClick={() =>
            setTimeout(() => {
              const str = model.api.str([]);
              str.ins(str.length(), '?');
            }, 2000)
          }
        >
          Append "?" to model after 2s
        </button>
      </div>
      <div>
        <button
          onClick={() =>
            setTimeout(() => {
              model.api.str([]).ins(0, '1. ');
            }, 2000)
          }
        >
          Prepend "1. " to model after 2s
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              model.reset(clone);
            }, 2000);
          }}
        >
          RESET after 2s
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              model.api.str([]).del(0, 1);
            }, 2000);
          }}
        >
          Delete model first char after 2s
        </button>
      </div>
      <pre style={{fontSize: '10px'}}>
        <code>{model.root + ''}</code>
      </pre>
    </div>
  );
};

const meta: Meta<EditorProps> = {
  title: 'CodeMirror Editor',
  component: Editor as any,
  argTypes: {},
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    src: 'gl',
  },
};
