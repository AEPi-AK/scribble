const ASCII = {
  Left: 37,
  Up: 38,
  Right: 39,
  Down: 40,
  Space: 32,
}

const Colors = {
  Green: '#78C67B',
  Red: '#E26161',
  Dark: '#404040',
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

  <content if={brothers}>
    <AttendanceCard brother={brothers[index]}></AttendanceCard>
    <h4>{index + 1}/{brothers.length}</h4>
  </content>
  // <pre>{JSON.stringify(brothers)}</pre>

  $ = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '10vmax',
    fontFamily: 'Rubik',
    fontWeight: 400,
    color: 'white',
    textAlign: 'center',
    backgroundColor: Colors.Dark,
  }

  $pre = {
    whiteSpace: 'pre-wrap',
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
