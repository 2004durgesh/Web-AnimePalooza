/* eslint-disable react/prop-types */
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useMediaQuery } from 'react-responsive';
import { AiOutlineDownload, AiOutlineSetting } from "react-icons/ai"
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { Link } from "react-router-dom/dist";

const VideoStreaming = ({ type, provider, server }) => {
  const { episodeId, mediaId } = useParams()
  const [sourcesUrl, setSourcesUrl] = useState("")
  const [download, setDownload] = useState('')
  const [sources, setSources] = useState([])
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [visible, setVisible] = useState(false);
  let url
  if (mediaId) {
    url = `https://consumet-api-pied.vercel.app/${type}/${provider}/watch/${episodeId}/${mediaId}?server=${server}`;
  } else {
    url = `https://consumet-api-pied.vercel.app/${type}/${provider}/watch/${episodeId}?server=${server}`;
  }
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      setSourcesUrl(data.sources[3].url);
      setDownload(data.download)
      setSources(data.sources)
      console.log(typeof (data.sources), data.sources);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="relative">
        <div className="absolute inset-0">
          <ReactPlayer
            url={sourcesUrl}
            controls={true}
            volume={1}
            playing={true}
            width="100%"
            height={isMobile ? "50vh" : "100vh"}
            config={{
              hls: {
                // Additional HLS configuration options go here (optional)
              },
            }}
          />
        </div>
        <div className="absolute top-0 right-0 flex flex-row my-10 space-x-5 md:space-x-10 mx-10">
          <Link to={`${download}`} target="_blank">
            <AiOutlineDownload className="cursor-pointer" color="white" size={isMobile ? 20 : 30} />
          </Link>
          <AiOutlineSetting className="cursor-pointer" color="white" size={isMobile ? 20 : 30} onClick={show} />
        </div>
        <div>
          <Rodal
            onClose={hide}
            visible={visible}
            animation="rotate"
            closeOnEsc={true}
            showCloseButton={false}
            customStyles={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '8px',
              padding: '20px',
              maxWidth: '80%',
            }}
          >
            <div>
              {sources.map((element) => {
                return (
                  <>
                    <div className="font-pro-bold font-semibold cursor-pointer text-pro-red px-2 py-1 capitalize" onClick={() => { setSourcesUrl(element.url) }}>{element.quality}</div>
                  </>
                )
              })}
            </div>
          </Rodal>
        </div>
      </section>
    </>
  );
};

export default VideoStreaming;
