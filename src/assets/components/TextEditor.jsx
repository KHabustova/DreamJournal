import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

/**
 * A rich text editor component for writing and editing journal entries.
 * 
 * @component
 * @param {string} body - The current content of the editor.
 * @param {Function} setBody - Function to update the content of the editor.
 * @returns {JSX.Element} The rendered TextEditor component.
 */
export default function TextEditor({ body, setBody }) {
  // Reference to the editor instance
  const editor = useRef(null);

  /**
   * Configuration for the Jodit editor.
   * - readonly: Determines if the editor is editable.
   * - placeholder: Placeholder text displayed when the editor is empty.
   * - buttons: Specifies the toolbar buttons available in the editor.
   * - disablePlugins: Disables specific plugins in the editor.
   */
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