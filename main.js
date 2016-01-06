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

  let brothers
  let index = 0

  load()

  async function load() {
    brothers = await fetch.json('/_/static/brothers.json');
    brothers.sort((a, b) => {
      if (a.isEBoard) return -1
      if (b.isEBoard) return 1
      if (a.last < b.last) return -1
      if (a.last > b.last) return 1
      return 0
    })
  }

  on.keydown(e => {
    if (e.keyCode == ASCII.Left) {
      index = Math.max(index -  1, 0);
    }
    else if (e.keyCode == ASCII.Right) {
      index = Math.min(index + 1, brothers.length - 1);
    }
    view.update();
  });

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

  <img
    src={`/_/static/${type == MeetingType.EBoard ? 'eboard' : 'brotherhood'}.svg`}
    onClick={changeMeetingType}
  />

  $ = {
    float: 'right',
    margin: '10px 14px 0 0',
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
    <div class='title'>December 9th, 2015</div>
    <MeetingTypeButton type={meetingType} onTypeChange={function(){}}></MeetingTypeButton>
  </div>
  <div class='separator'></div>
  <div class='notes'>
    <pre>{notesContent}</pre>
  </div>
  <div class='sidebar'>
  </div>

  $ = {
    width: 937,
    height: 959,
    backgroundColor: Colors.Lighter,
    borderRadius: 10,
    boxShadow: `0 2px 5px 0px ${Colors.Shadow}`
  }

  $header = {
  }

  $title = {
    fontWeight: Font.Weight.Medium,
    fontSize: Font.Size.Title,
    marginLeft: 20,
    marginTop: 17,
    marginBottom: 12,
    display: 'inline-block',
  }

  $separator = {
    backgroundColor: 'black',
    width: '100%',
    height: 2,
  }

  $notes = {
    whiteSpace: 'pre-wrap',
    fontSize: Font.Size.Text,
    marginLeft: 20,
    width: 650,
  }

  $pre = {
    margin: 0,
    whiteSpace: 'pre-line',
  }

  $sidebar = {
    width: 260,
    height: 895,
    float: 'right',
    marginTop: -864,
    backgroundColor: Colors.Light,
    borderBottomRightRadius: 10,

  }

}

view StatusIcon {
  <img src={view.props.on ? '/_/static/check.svg' : '/_/static/cancel.svg'}>
  </img>
}

view AttendanceCard {
  <name>Brother {view.props.brother.last}</name>
  <img class="avatar" src={view.props.brother.avatarURL || 'https://scontent-iad3-1.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/11061191_10207117437160503_6933297688243743861_n.jpg?oh=0f998433b7d42d81c9fa992880fc8730&oe=5721071D'}></img>
  <StatusIcon on={view.props.brother.isPresent}></StatusIcon>

  on.keyup(e => {
    if (e.keyCode == ASCII.Up) {
      view.props.brother.isPresent = true;
    }
    else if (e.keyCode == ASCII.Down) {
      view.props.brother.isPresent = false;
    }
    view.update();
  });

  $avatar = {
    width: '100%',
    height: 'auto',
    marginTop: 10,
    marginBottom: 15,
  }

  $ = {
    width: 350,
    height: 500,
    textAlign: 'center',
    backgroundColor: view.props.brother.isPresent ? Colors.Green : Colors.Red,
    borderRadius: 10,
    backgroundSize: 'cover',
    fontSize: '1.7rem',
    paddingTop: 15,
    paddingBottom: 15,
    boxShadow: '0 0 10px black'
  }

}
