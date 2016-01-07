const lower = s => s.toLowerCase()

const ASCII = {
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Space: 32,
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

  // let brothers
  // let index = 0
  //
  // load()
  //
  // async function load() {
  //   brothers = await fetch.json('/_/static/brothers.json');
  //   brothers.sort((a, b) => {
  //     if (a.isEBoard) return -1
  //     if (b.isEBoard) return 1
  //     if (a.last < b.last) return -1
  //     if (a.last > b.last) return 1
  //     return 0
  //   })
  // }
  //
  // on.keydown(e => {
  //   if (e.keyCode == ASCII.Left) {
  //     index = Math.max(index -  1, 0);
  //   }
  //   else if (e.keyCode == ASCII.Right) {
  //     index = Math.min(index + 1, brothers.length - 1);
  //   }
  //   view.update();
  // });

  // <content if={brothers}>
  //   <AttendanceCard brother={brothers[index]}></AttendanceCard>
  //   <h4>{index + 1}/{brothers.length}</h4>
  // </content>
  <MinutesCard/>
  // <pre>{JSON.stringify(brothers)}</pre>

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

view QourmIndicator {

  let value = view.props.value

  <div onClick={() => {value++}}>
    {`+${value}`}
  </div>

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
    backgroundColor: Colors.Green,
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

  <div onClick={changeMeetingType}>
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
  // <pre>{view.props.content}</pre>
  <Editor content={view.props.content}/>

  $ = {
    whiteSpace: 'pre-wrap',
    fontSize: Font.Size.Text,
    width: 650,
  }

  $pre = {
    margin: 0,
    whiteSpace: 'pre-line',
  }
}

view MinutesCard {

  const notesContent = `
  The meeting was called to order at 1:08 p.m.

  ---

  Passing of the Brotherhood Minutes from November 29th, 2015.

  Passing of the Executive Board Minutes from November 30th, 2015.

  ---
  #### The Pledgemaster reported

  - Reaching out to bros for lt pledgemaster.
  - Will have decided by next semester.

  ---
  #### The Sentinel reported

  - Good job not being too risky at semi-formal.
  - I didn't get a lot of texts this weekend. Text your risk man or let us know in person.

  ---
  #### The Steward reported

  - Overall, people did a good job this week. Keep it up.
  - Looking at ways to change ways of distributing waiter duties. stay tuned next semester. Come talk to me if you have input.
  - Please do your waiter duties.

  ---
  #### The Member at Large reported

  - IFC is this Tuesday at 9:30 p.m.
  - Not so much going on. New IFC executive board has been installed, congrats to Brother Loomis. (IFC Exec is now: 2 SAE, 1 Pike, 2 SigEp, 1 Sig Chi, 1 Alpha Sig, 1 AEPi)
  - I'm continuing to talk 1 on 1 to brothers.

  ---
  #### The Exchequer reported

  - Brother Master: Come light [candles] with me.

  ---
  Good & Welfare
  ---
  The meeting was adjourned at 1:48 p.m.
  `;

  let meetingType = MeetingType.Brotherhood;

  <div class='header'>
    <title>December 9th, 2015</title>
    <QourmIndicator value={14}/>
    <MeetingTypeButton type={meetingType} onTypeChange={() => {}}/>
  </div>
  <separator/>
  <Notes content={notesContent}/>
  <Sidebar/>

  $ = {
    width: 937,
    height: 959,
    backgroundColor: Colors.Lighter,
    borderRadius: 10,
    boxShadow: `0 2px 5px 0px ${Colors.Shadow}`
  }

  $title = {
    fontWeight: Font.Weight.Medium,
    fontSize: Font.Size.Title,
    marginLeft: 20,
    marginTop: 17,
    marginBottom: 8,
    display: 'inline-block',
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
  <BrotherList searchText={searchText}/>

  $ = {
    width: 260,
    height: 899,
    float: 'right',
    marginTop: -890,
    backgroundColor: Colors.Light,
    borderBottomRightRadius: 10,
  }
}

view BrotherItem {

  <wrapper onClick={view.props.onSelect}>
    <status onClick={view.props.onToggle}/>
    <name>{view.props.brother.name}</name>
  </wrapper>

  $ = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 13,
    userSelect: 'none',
    backgroundColor: view.props.isSelected ? '#D6D6D6' : 'transparent',
    cursor: 'pointer',
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

  let brothers = [...Array(56).keys()].map(id => {
    return {
      id,
      isSelected: false,
      isPresent: true,
      name: 'Carovi Hermanoff ' + Math.round(Math.random() * 100),
    }
  });

  let selected = null

  const setItem = (obj, x, xs) =>
    xs.map(_x => _x.id == x.id ? Object.assign(x, obj) : _x)

  const toggle = (b, bs) => setItem({ isPresent: !b.isPresent }, b, bs)

  const matchesSearch = b => lower(b.name).includes(view.props.searchText)

  <BrotherItem
    onSelect={() => selected = _}
    onToggle={() => brothers = toggle(_, brothers)}
    isSelected={selected == _}
    repeat={brothers.filter(matchesSearch)}
    brother={_}
    key={_.id}
  />

  $ = {
    overflow: 'auto',
    height: 864-25,

  }
}

view SearchBox {
  let searchText = ''

  <img src='/_/static/search.svg'/>
  <input
    type='text'
    sync={searchText}
    onKeyUp={() => view.props.onChange(searchText)}
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
