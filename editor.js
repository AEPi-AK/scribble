import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/dawn'
import 'brace/keybinding/vim'

const ASCII = {
  Slash: 191
}

view Editor {

  let editor = null

  const onLoad = newEditor => {
    editor = newEditor
    // editor.setKeyboardHandler("ace/keyboard/vim");
  }

  on.keydown(window, e => {
    if (!(e.ctrlKey && e.metaKey && e.shiftKey) || e.keyCode != ASCII.Slash) {
      return true
    }
    editor && editor.focus()
    return true
  })

  <AceEditor
    mode='markdown'
    theme='dawn'
    onChange={view.props.onChange}
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
