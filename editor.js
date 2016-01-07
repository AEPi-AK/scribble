import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/dawn'
import 'brace/keybinding/vim'

view Editor {

  const onLoad = editor => {
    editor.setKeyboardHandler("ace/keyboard/vim");
  }

  <AceEditor
    mode='markdown'
    theme='dawn'
    onChange={newValue => console.log('change', newValue)}
    value={view.props.content}
    showGutter={false}
    showPrintMargin={false}
    onLoad={onLoad}
    highlightActiveLine={false}
    width='640px'
    height='879px'
    wrapEnabled={true}
    editorProps={{$blockScrolling: true}}
  />

}
