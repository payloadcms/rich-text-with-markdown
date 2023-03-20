import * as React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGFM from 'remark-gfm'

const remarkPlugins = [remarkGFM]

const Viewer: React.FC = ({ markdown }) => {
  return (
    <ReactMarkdown
      children={markdown}
      remarkPlugins={remarkPlugins}
    />
  )
}

export default Viewer