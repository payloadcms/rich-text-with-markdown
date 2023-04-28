export const withMarkdown = (editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element) => (element.type === 'markdown' ? true : isVoid(element));

  return editor;
};
