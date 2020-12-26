const stompit = require('stompit');

const connectOptions = {
  'host': 'localhost',
  'port': 61613,
  'connectHeaders': {
    'host': '/',
    'login': 'admin',
    'passcode': 'admin',
    'heart-beat': '5000,5000'
  }
};

stompit.connect(connectOptions, function (error, client) {

  if (error) {
    console.log('connect error ' + error.message);
    return;
  }
  let count = 1;

  setInterval(function(){

  const sendHeaders = {
    'destination': '/topic/dog',
    // 'content-type': 'text/plain'
    'content-type': 'application/json'
  };
    const text = {
      name: "Sam",
      addr: {
        doorNo: `  Door no ${count}`,
        street: ` ${count}th Avenue`,
        city: "New York"
      }
    }
  const frame = client.send(sendHeaders);
  // frame.write('[{"name":"DOGS","status":"first"},{"name":"CATS","status":"second"}]');
  // frame.end();
  // setInterval(function(){
  // frame.write('[{"name":"DOGS","status":"first"},{"name":"CATS","status":"second"}]');
    frame.write(JSON.stringify(text));
  frame.end(); console.log(` i am intervel ${count++}`);
  },5000);
  // const subscribeHeaders = {
  //   'destination': '/topic/dog',
  //   'ack': 'client-individual'
  // };
  // console.log('I am subscribing to before ===>');
  // client.subscribe(subscribeHeaders, function (error, message) {
  // console.log('I am subscribing to after===>');
  //   if (error) {
  //     console.log('subscribe error ' + error.message);
  //     return;
  //   }
  //
  //   message.readString('utf-8', function (error, body) {
  //
  //     if (error) {
  //       console.log('read message error ' + error.message);
  //       return;
  //     }
  //
  //     console.log('received message: ' + body);
  //
  //     client.ack(message);
  //
  //     client.disconnect();
  //   });
  // })

});
