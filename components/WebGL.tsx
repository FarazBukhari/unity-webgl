'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnity } from '@fortawesome/free-brands-svg-icons';

const unityContextLocation: string = '/unity/Build';
const streamingAssestLocation: string = 'unity/StreamingAssets';
const fileName: string = 'VrVideoPlayer';

const WebGL = () => {
    // Default values for videoUrl and type
    const localVideoFile = 'VRSampleVideo/fiverr folder/Explore Birds and Animals_stereo.mp4';
    const [videoUrl, setVideoUrl] = useState(localVideoFile);
    const [type, setType] = useState('local');
    const fullscreenButtonRef = useRef<HTMLButtonElement>(null);

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const { unityProvider, isLoaded, loadingProgression, sendMessage, addEventListener, removeEventListener, requestFullscreen } = useUnityContext({
        loaderUrl: `${unityContextLocation}/${fileName}.loader.js`,
        dataUrl: `${unityContextLocation}/${fileName}.data.unityweb`,
        frameworkUrl: `${unityContextLocation}/${fileName}.framework.js.unityweb`,
        codeUrl: `${unityContextLocation}/${fileName}.wasm.unityweb`,
        streamingAssetsUrl: streamingAssestLocation
    });

    const loadingPercentage = Math.round(loadingProgression * 100);

    const calculateDimensions = () => {
        const aspectRatio = 16 / 9; // 16:9 aspect ratio
        const maxWidth = window.innerWidth * 0.9; // 90% of the viewport width
        const maxHeight = window.innerHeight * 0.85; // 85% of the viewport height

        let width = maxWidth;
        let height = width / aspectRatio;

        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }

        setDimensions({ width, height });
    };

    const formatURL = (url: string) => {
        return url.replace(/ /g, '%20');
    };

    useEffect(() => {
        calculateDimensions();
        window.addEventListener('resize', calculateDimensions);
        return () => {
            window.removeEventListener('resize', calculateDimensions);
        };
    }, []);

    // Send message to Unity when the component is loaded
    useEffect(() => {
        if (isLoaded && videoUrl) {
            sendMessage('PlatformDetector', 'TestJsCallBack', JSON.stringify({ url: formatURL(videoUrl), type }));
        } else {
            console.error('Video URL not found in query parameters.');
        }
    }, [isLoaded]);

    // Handle loading the video
    const handleLoadVideo = () => {
        if (isLoaded && videoUrl) {
            sendMessage('PlatformDetector', 'TestJsCallBack', JSON.stringify({ url: formatURL(videoUrl), type }));
        } else {
            console.error('Unity is not loaded yet.');
        }
    };

    // Toggle between local and remote
    const handleTypeChange = (type: string) => {
        setType(type);
        if (type === 'local') setVideoUrl(localVideoFile);
    };

    const handleUrlChange = (e: any) => {
        e.preventDefault();
        setVideoUrl(e.target.value);
    };

    const playButtonCallback = useCallback(() => {
        //! for some reason requestFullscreen function does not trigger inside a hook
        // requestFullscreen(true);

        //* hidden fullscreen button click event triggered
        fullscreenButtonRef.current?.click();
    }, []);
    

    useEffect(() => {
        addEventListener('PlayBtnCallBack', playButtonCallback);
        return () => {
            removeEventListener('PlayBtnCallBack', playButtonCallback);
        };
    }, [addEventListener, removeEventListener, playButtonCallback]);

    return (
        <div className="flex h-full w-full flex-col justify-center items-center">
            <div className="mb-4 flex gap-4 items-center">
                {/* Radio buttons for selecting video type */}
                <div className="flex items-center">
                    <button
                        className={`px-4 py-2 border ${type === 'local' ? 'bg-yellow-500 text-white' : 'bg-transparent text-white'}`}
                        onClick={() => handleTypeChange('local')}
                    >
                        Local
                    </button>
                    <button
                        className={`px-4 py-2 border ${type === 'remote' ? 'bg-blue-500 text-white' : 'bg-transparent text-white'}`}
                        onClick={() => handleTypeChange('remote')}
                    >
                        Remote
                    </button>
                </div>

                {/* Input field for video URL */}
                <input
                    type="text"
                    value={videoUrl}
                    onChange={handleUrlChange}
                    placeholder="Enter video URL..."
                    className="p-2 border rounded-md"
                    style={{ width: '300px' }}
                    disabled={!isLoaded}
                />

                {/* Load video button */}
                <button onClick={handleLoadVideo} className="p-2 bg-green-500 text-white rounded-md">
                    Load Video
                </button>
            </div>

            {/* Unity Player */}
            {!isLoaded && (
                <div className="loading-overlay flex flex-col h-full w-full justify-center items-center text-white">
                    <div className="m-12">
                        <FontAwesomeIcon
                            icon={faUnity}
                            className="text-6xl text-white animate-spin"
                            style={{ transformOrigin: 'center' }}
                        />
                    </div>
                    <p>Loading build... ({loadingPercentage}%)</p>
                </div>
            )}

            <Unity
                unityProvider={unityProvider}
                className="unity-canvas"
                devicePixelRatio={3}
                style={{
                    height: `${dimensions.height}px`,
                    width: `${dimensions.width}px`,
                    display: isLoaded ? 'flex' : 'none',
                    position: 'relative',
                    aspectRatio: '16/9'
                }}
            />
            <button style={{ display: 'none' }} ref={fullscreenButtonRef} onClick={() => requestFullscreen(true)}>Fullscreen</button>
        </div>
    );
};

export default WebGL;
