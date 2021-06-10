import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
// ? CTRL+SHIFT+P = ctrl+alt+l
// * чтобы дыннфе приходили без обновления страницы надо создать соеденение с веб-сокетом 
function App() {
  const ws = new WebSocket('ws://localhost:8000/todo/test/')
  console.log(window.location.host)
  ws.onopen = () => {
    console.log('ws opened')
  }
  useEffect(()=>{
    ws.onmessage = (e)=>{
      console.log('WS - ', e)

    }
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={()=>{
            var data = new FormData();
            data.append("text", "test text new todo 2222");

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    console.log(this.responseText);
                }
            });

            xhr.open("POST", "http://localhost:8000/todolist/");
            xhr.setRequestHeader("Authorization", "Token 17a7be5db53845bc5288e870235ff89f2e17d6c1");
            xhr.setRequestHeader("X-CSRFToken", `${csrftoken}`);

            xhr.send(data);
        }} >submit</button>

      </header>
    </div>
  );
}
function getCookie(name:string) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
export default App;
