import './App.css';
import { useEffect, useState, ChangeEvent } from 'react';

const urlRegex = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})');

const App = () => {
  const [urls, setUrls] = useState([]);
  const [longUrl, setLongUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const fetchUrls = async () => {
    const res = await fetch('http://localhost:4000/urls');
    const jsonRes = await res.json()
    setUrls(jsonRes)
  }

  useEffect(() => {
    fetchUrls();
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement>):void => {
    const val: string = event.target.value
    setLongUrl(val);
  }
  
  const handleSubmit = () => {
    if(longUrl.match(urlRegex)){
      fetch('http://localhost:4000/create-short-link',{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "url": longUrl,
        })
      }).then(async response => {
        const res = await response.json();
        if(res?.success){
          setBannerUrl(res?.short_url);
        }
        setLongUrl("");
        fetchUrls();
      })
    }
  }

  return (
    <div className="app">
      <div className='container'>
        {bannerUrl && bannerUrl.length > 0 && (
          <div className='banner'>
            Your shortened URL is ready <br/><a href='{bannerUrl}'>{bannerUrl}</a>
          </div>
        )}
        <ul>
          {urls?.map(({short_url}) => (
            <li key={short_url}><a href={short_url}>{short_url}</a></li>
          ))}
        </ul>
          <input type="text" className='input-url' placeholder='Enter a url' value={longUrl} onChange={handleChange}/>
          <button className='button-url' onClick={handleSubmit}>Get Short Url</button> 
      </div>
    </div>
  );
}

export default App;
