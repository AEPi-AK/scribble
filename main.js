import moment from 'moment'

const lower = s => s.toLowerCase()

const sortFn = (a, b) => {
  if (a.rank && b.rank) return a.rank - b.rank;
  if (!a.rank && b.rank) return 1;
  if (a.rank && !b.rank) return -1;
  return a.last + a.first < b.last + b.first ? -1 : 1;
}
const FMT = {
  LongDate: 'MMMM Do, YYYY',
  ShortDate: 'M/D/YY',
}

const ASCII = {
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Space: 32,
  Slash: 191,
}

const MeetingType = {
  EBoard: 0,
  Brotherhood: 1,
}

const Font = {
  Size: {
    Title: 24,
    Sidebar: 14,
    Quorum: 14.7,
    MeetingType: 18.7,
    Text: 13,
  },
  Weight: {
    Light: 300,
    Regular: 400,
    Medium: 500,
  },
}

const Colors = {
  Green: '#78C67B',
  Red: '#E26161',
  Purple: '#A778C6',
  Blue: '#78BFC6',
  Orange: '#C69E78',
  Gray: '#6E6E6E',
  Dark: '#393E46',
  Light: '#E3E3E3',
  Lighter: '#EEEEEE',
  Shadow: 'rgba(0, 0, 0, 0.5)',
}

view Main {

  <MinutesCard/>

  $ = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 30,

    fontFamily: 'Rubik',
    fontWeight: 400,
    backgroundColor: Colors.Dark,
  }
}

view QourumIndicator {

  let quorum = total => Math.round(total / 2) + 1
  let _overQuorum = (present, total) => present - quorum(total)
  let overQuorum = () => _overQuorum(view.props.present, view.props.total)

  <count>
    {`${overQuorum() > 0 ? '+' : ''}${overQuorum()}`}
  </count>

  $ = {
    color: 'white',
    float: 'right',
    borderRadius: '50%',
    margin: '12px 14px 0 0',
    width: 37,
    height: 37,
    lineHeight: 2.6,
    textAlign: 'center',
    fontWeight: Font.Weight.Regular,
    fontSize: Font.Size.Quorum,
    backgroundColor: overQuorum() >= 0 ? Colors.Green: Colors.Red,
  }

}

view MeetingTypeButton {

  let type = view.props.type;

  function changeMeetingType() {
    if (type == MeetingType.Brotherhood) {
      newType = MeetingType.EBoard
    } else {
      newType = MeetingType.Brotherhood
    }
    view.props.onTypeChange(newType)
    type = newType
  }

  <div
    onClick={changeMeetingType}
    title={(type == MeetingType.EBoard
      ? 'executive board'
      : 'brotherhood')
      + ' meeting'}
  >
    {type == MeetingType.EBoard ? 'E' : 'B'}
  </div>

  $ = {
    color: 'white',
    float: 'right',
    width: 37,
    height: 37,
    lineHeight: 2,
    paddingLeft: 1,
    borderRadius: '50%',
    textAlign: 'center',
    margin: '12px 10px 0 0',
    fontWeight: Font.Weight.Medium,
    fontSize: Font.Size.MeetingType,
    backgroundColor: type == MeetingType.EBoard ? Colors.Orange : Colors.Purple,
  }

}

view Notes {
  <Editor
    onChange={view.props.onChange}
    content={view.props.content}
  />

  $ = {
    whiteSpace: 'pre-wrap',
    fontSize: Font.Size.Text,
  }

  $Editor = {
    margin: 20,
  }
}

view RenderedMinutes {
  let meetingName, presentBrothers, absentBrothers
  let dateOfMeeting, dateOfLastEBoardMeeting, dateOfLastBrotherhoodMeeting

  on.props(load)

  const _meetingName = t => {
    return t == MeetingType.EBoard ? 'Executive Board' : 'Brotherhood'
  }
  const formatBrothers = bs => {
    return bs.length ? '* ' + bs.map(b => b.name).join('\n* ') : ''
  }

  const formatDate = date => date.format(FMT.LongDate)

  function load() {
    const brothers = view.props.brothers.slice().sort(sortFn)
    const isEBoard = view.props.meetingType == MeetingType.EBoard
    meetingName = _meetingName(view.props.meetingType)
    dateOfMeeting = view.props.date
    dateOfLastEBoardMeeting = moment(dateOfMeeting).subtract(6, 'day')
    dateOfLastBrotherhoodMeeting = moment(dateOfMeeting).subtract(7, 'day')
    presentBrothers = formatBrothers(brothers.filter(b => b.isPresent))
    absentBrothers = formatBrothers(brothers.filter(b => {
      return !b.isPresent && (isEBoard ? b.rank : true)
    }))
  }

  <pre>{`## Minutes of the ${meetingName} Meeting \
of the Alpha Kappa Chapter of the Alpha Epsilon Pi Fraternity

### ${formatDate(dateOfMeeting)}

The following members were present at meeting:

${presentBrothers ? presentBrothers  : '*none*'}

The following members were absent from meeting:

${absentBrothers ? absentBrothers : '*none*'}

---

The meeting was called to order at <>}

---

Passing of the Brotherhood Minutes from ${formatDate(dateOfLastBrotherhoodMeeting)}.

Passing of the Executive Board Minutes from ${formatDate(dateOfLastEBoardMeeting)}.

${view.props.notesContent}`}</pre>

  $ = {
    overflow: 'scroll',
    height: '879px'
  }

  $pre = {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0,
    width: '100%',
    whiteSpace: 'pre-wrap',
    overflow: 'scroll',
  }
}

view MinutesCard {

  const save = (k, v) => localStorage.setItem(k, JSON.stringify(v))

  const load = k => JSON.parse(localStorage.getItem(k))

  const hasKey = k => localStorage.hasOwnProperty(k)

  const ensureDefault = (k, v) => hasKey(k) ? void 0 : save(k, v)

  class MinutesData {

    constructor() {
      ensureDefault('type', MeetingType.Brotherhood)
      ensureDefault('brothers', __brothers.map((brother, i) => {
        return {
          id: i,
          isPresent: true,
          ddoard: brother.isEBoard,
          rank: brother.rank,
          first: brother.first,
          last: brother.last,
          name: `${brother.first} ${brother.last}`,
        }
      }))
      ensureDefault('date', moment().format(FMT.ShortDate))
      ensureDefault('content', `#### The Pledgemaster reported\r\n\r\n- Reaching out to bros for lt pledgemaster.\r\n- Will have decided by next semester.\r\n\r\n---\r\n#### The Sentinel reported\r\n\r\n- Good job not being too risky at semi-formal.\r\n- I didn\'t get a lot of texts this weekend. Text your risk man or let us know in person.\r\n\r\n---\r\n#### The Steward reported\r\n\r\n- Overall, people did a good job this week. Keep it up.\r\n- Looking at ways to change ways of distributing waiter duties. stay tuned next semester. Come talk to me if you have input.\r\n- Please do your waiter duties.\r\n\r\n---\r\n#### The Member at Large reported\r\n\r\n- IFC is this Tuesday at 9:30 p.m.\r\n- Not so much going on. New IFC executive board has been installed, congrats to Brother Loomis. (IFC Exec is now: 2 SAE, 1 Pike, 2 SigEp, 1 Sig Chi, 1 Alpha Sig, 1 AEPi)\r\n- I\'m continuing to talk 1 on 1 to brothers.\r\n\r\n---\r\n#### The Exchequer reported\r\n\r\n- Brother Master: Come light [candles] with me.\r\n\r\n---\r\nGood & Welfare\r\n---\r\nThe meeting was adjourned at 1:48 p.m.`)
    }

    get type() { return load('type') }
    set type(v) { save('type', v) }

    get brothers() { return load('brothers') }
    set brothers(v) { save('brothers', v) }

    get date() { return load('date') }
    set date(v) { save('date', v) }

    get content() { return load('content') }
    set content(v) { save('content', v) }
  }

  let M = new MinutesData()

  let render = false

  <div class='header'>
    <input type='text'
      sync={M.date}
      class='title'
    />
    <QourumIndicator
      present={M.brothers.filter(b => b.isPresent).length}
      total={M.brothers.length}
    />
    <MeetingTypeButton
      type={M.type}
      onTypeChange={type => M.type = type}
    />
    <label>{'render'}
      <input
        class='render'
        type='checkbox'
        onChange={() => render = !render}
      />
    </label>
  </div>
  <separator/>
  <Notes
    if={!render}
    content={M.content}
    onChange={content => M.content = content}
  />
  <Sidebar
    if={!render}
    brothers={M.brothers}
    brothersChanged={brothers => M.brothers = brothers}
  />
  <RenderedMinutes
    if={render}
    brothers={M.brothers}
    notesContent={M.content}
    meetingType={M.type}
    date={moment(M.date, FMT.ShortDate)}
  />

  $ = {
    width: 937,
    height: 959,
    backgroundColor: Colors.Lighter,
    borderRadius: 10,
    boxShadow: `0 2px 5px 0px ${Colors.Shadow}`
  }

  $label = {
    fontSize: 12,
    fontWeight: Font.Weight.Light,
    margin: 10,
    marginTop: 15,
    float: 'right',
  }

  $render = {
    margin: 10,
  }

  $title = {
    fontWeight: Font.Weight.Medium,
    fontSize: Font.Size.Title,
    marginLeft: 20,
    marginTop: 17,
    marginBottom: 8,
    display: 'inline-block',
    fontFamily: 'Rubik',
    background: 'transparent',
    border: 0,
    color: moment(M.date, FMT.ShortDate, true).isValid() ? 'inherit' : Colors.Red,
    outline: 0,
  }

  $separator = {
    backgroundColor: 'black',
    width: '100%',
    height: 2,
  }

}

view Sidebar {
  let searchText = ''

  <SearchBox onChange={newText => searchText = lower(newText)}/>
  <BrotherList yield searchText={searchText}/>

  $ = {
    width: 260,
    height: 899,
    float: 'right',
    marginTop: -919,
    backgroundColor: Colors.Light,
    borderBottomRightRadius: 10,
  }
}

view BrotherItem {

  <status onClick={view.props.onToggle}/>
  <name>{view.props.brother.name}</name>

  on.click(view.props.onSelect)

  $ = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 13,
    backgroundColor: view.props.isSelected ? '#D6D6D6' : 'transparent',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: view.props.isSelected ? '#D6D6D6' : 'hsla(0, 0%, 83%, 0.40)',
    }

  }

  $status = {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: view.props.brother.isPresent ? Colors.Green : Colors.Red,
    display: 'inline-block',
    marginRight: 13,
  }

  $name = {
    fontWeight: Font.Weight.Light,
    fontSize: Font.Size.Sidebar,
    display: 'inline-block',
  }
}

view BrotherList {

  let brothers = view.props.brothers.slice().sort(sortFn)

  let searching = false
  let selectedIndex = 0
  // index before we started searching, which will be restored
  // (i.e. selectedIndex will be set to this) when we stop searching
  let prevSelectedIndex = 0

  on.props(props => {
    // user stopped searching
    if (props.searchText == '') {
      // we were searching before
      if (searching) {
        selectedIndex = prevSelectedIndex
      }
      searching = false
    }
    // user is searching
    else {
      // we weren't searching before
      if (!searching) {
        prevSelectedIndex = selectedIndex
        selectedIndex = 0
      }
      searching = true
    }
  })

  const setItem = (obj, x, xs) =>
    xs.map(_x => _x.id == x.id ? Object.assign(x, obj) : _x)

  const toggle = (b, bs) => setItem({ isPresent: !b.isPresent }, b, bs)

  const setPresent = (b, bs) => setItem({ isPresent: true }, b, bs)

  const setAllPresent = bs => bs.map(b => Object.assign(b, { isPresent: true }))

  const setAbsent = (b, bs) => setItem({ isPresent: false }, b, bs)

  const setAllAbsent = bs => bs.map(b => Object.assign(b, { isPresent: false }))

  const matchesSearch = b => lower(b.name).includes(view.props.searchText)

  const setBrothers = newBrothers => {
    brothers = newBrothers
    view.props.brothersChanged(brothers)
  }

  const getBrothers = () => brothers.filter(matchesSearch)

  <BrotherItem
    onSelect={() => selectedIndex = getBrothers().indexOf(_)}
    onToggle={() => setBrothers(toggle(_, brothers))}
    isSelected={selectedIndex == getBrothers().indexOf(_)}
    repeat={getBrothers()}
    brother={_}
    key={_.id}
  />

  on.keydown(window, e => {
    if (!(e.ctrlKey && e.metaKey)) return true

    switch (e.keyCode) {
      case ASCII.Up:
        if (e.shiftKey) selectedIndex = 0
        else selectedIndex = Math.max(selectedIndex - 1, 0)
        break;
      case ASCII.Down:
        maxIndex = brothers.length - 1
        if (e.shiftKey) selectedIndex = maxIndex
        else selectedIndex = Math.min(selectedIndex + 1, maxIndex)
        break;
      case ASCII.Left:
        if (e.shiftKey) {
          newBrothers = brothers
          getBrothers().forEach(brother => {
            newBrothers = setAbsent(brother, brothers)
          })
          setBrothers(newBrothers)
        }
        else setBrothers(setAbsent(getBrothers()[selectedIndex], brothers))
        break;
      case ASCII.Right:
        if (e.shiftKey) {
          newBrothers = brothers
          getBrothers().forEach(brother => {
            newBrothers = setPresent(brother, brothers)
          })
          setBrothers(newBrothers)
        }
        else setBrothers(setPresent(getBrothers()[selectedIndex], brothers))
        break;
    }
  })

  $ = {
    overflow: 'auto',
    height: 864-25,

  }
}

view SearchBox {
  let searchText = ''

  on.keydown(window, e => {
    if (!(e.ctrlKey && e.metaKey) || e.keyCode != ASCII.Slash) return true
    view.refs.input.focus()
  })

  <img src='/_/static/search.svg'/>
  <input
    type='text'
    sync={searchText}
    onKeyUp={() => view.props.onChange(searchText)}
    ref='input'
    placeholder='search brothers'
  />

  $ = {
    position: 'relative',
    marginBottom: 3,
  }

  $img = {
    position: 'absolute',
    top: 21,
    left: 28,
  }

  $input = {
    border: `2px solid ${Colors.Gray}`,
    fontFamily: 'Rubik',
    fontSize: Font.Size.Sidebar,
    width: '90%',
    backgroundColor: Colors.Lighter,
    textIndent: 35,
    outline: 0,
    height: 34,
    marginLeft: 13,
    marginTop: 13,
    borderRadius: 100,
  }
}
