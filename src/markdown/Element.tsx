import * as React from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';
import { elementIdentifier } from '.';
import { CodeEditor } from 'payload/dist/admin/components/elements/CodeEditor';
import Button from 'payload/dist/admin/components/elements/Button'

import classes from './index.module.scss';

const Viewer = React.lazy(() => import('./Viewer'))

const valueKey = 'markdownValue';

type ElementProps = {
  attributes: React.HTMLAttributes<HTMLDivElement>
  children: React.ReactNode
  element: any
  fieldProps: {
    path: string
  }
}
export const Element: React.FC<ElementProps> = (props) => {
  const {
    attributes,
    children,
    element,
    fieldProps,
  } = props;

  const currentState = element?.[valueKey] || '';
  const [markdownState, setMarkdownState] = React.useState<'editor' | 'viewer'>('editor');

  const editor = useSlateStatic()

  const updateNode = React.useCallback((newValue) => {
    if (currentState !== newValue) {
      const elementPath = ReactEditor.findPath(editor, element);

      Transforms.setNodes(editor,
        {
          type: elementIdentifier,
          [valueKey]: newValue,
          children: [
            { text: ' ' },
          ],
        },
        { at: elementPath },
      );
    }
  }, [editor, element]);

  const removeNode = React.useCallback(() => {
    const elementPath = ReactEditor.findPath(editor, element);

    Transforms.removeNodes(
      editor,
      { at: elementPath },
    );
  }, [editor, element]);

  return (
    <div
      {...attributes}
      contentEditable={false}
      className={classes.markdownElement}
    >
      <div className={classes.header}>
        <p className={classes.headerText}>Markdown</p>

        <div className={classes.rightSection}>
          <div className={classes.tabs}>
            <button
              className={markdownState === 'editor' ? classes.active : ''}
              type="button"
              onClick={() => setMarkdownState('editor')}
            >
              Edit
            </button>
            <button
              className={markdownState === 'viewer' ? classes.active : ''}
              type="button"
              onClick={() => setMarkdownState('viewer')}
            >
              Preview
            </button>
          </div>

          <Button
            icon="x"
            round
            buttonStyle="icon-label"
            className={classes.removeButton}
            onClick={(e) => {
              e.preventDefault();
              removeNode();
            }}
            tooltip="Remove Markdown"
            disabled={fieldProps?.admin?.readOnly}
          />
        </div>
      </div>

      {markdownState === 'editor' && (
        <CodeEditor
          onChange={updateNode}
          language="markdown"
          className={classes.customEditor}
          height="20vh"
          value={currentState}
          options={{
            wordBasedSuggestions: false,
            formatOnType: true,
            lineNumbers: false,
            copyWithSyntaxHighlighting: false,
            lineDecorationsWidth: 0,
          }}
        />
      )}

      {markdownState === 'viewer' && (
        <React.Suspense>
          <div
            className={classes.viewerContainer}
            style={{
              height: '20vh',
            }}
          >
            <Viewer
              markdown={currentState}
            />
          </div>
        </React.Suspense>
      )}

      <div
        style={{
          height: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};