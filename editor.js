import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/github'
import 'brace/theme/solarized_dark'

view Editor {

  const onLoad = editor => {
    console.log(editor.session)
    editor.setOption('cursorStyle', 'wide')
    console.log(editor.getOptions())
  }

  <AceEditor
    mode='markdown'
    theme='github'
    onChange={newValue => console.log('change', newValue)}
    value={view.props.content}
    showGutter={false}
    onLoad={onLoad}
    highlightActiveLine={false}
    width='679px'
    height='890px'
    wrapEnabled={true}
    editorProps={{$blockScrolling: true}}
  />

}
