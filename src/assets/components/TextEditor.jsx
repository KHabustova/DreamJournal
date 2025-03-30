import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

export default function TextEditor({ body, setBody }) {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false, 
    placeholder: 'Write down your dream',
    buttons: 'bold,italic,underline,font,fontsize,|,paragraph,cut,copy,paste,indent,outdent,undo,redo',
    disablePlugins: 'add-new-line'
  }), []);

  return (
    <JoditEditor
      ref={editor}
      value={body}
      config={config}
      tabIndex={1}
      onChange={newContent => setBody(newContent)} 

    />
  );
};